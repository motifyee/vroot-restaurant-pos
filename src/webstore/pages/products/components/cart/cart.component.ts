import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Injector, signal } from '@angular/core';
import { CartIconComponent } from './icons/cart-icon.component';
import { ScrollService } from '../../../../services/scroll.service';
import {
	cartExpandUp,
	floatUp,
} from '../../../../animations/float-up.animation';
import { AuthModalComponent } from '../../../../components/auth-modal/auth-modal.component';
import {
	settingsStore,
	userStore,
	cartStore,
	invoiceStore,
} from '@webstore/state';
import { UserAddressesModalComponent } from '../../../../components/user-addresses-modal/user-addresses-modal.component';
import { scaleInOut } from '../../../../animations/scale-in-out.animation';
import { singleCallEffect } from '@src/app/core';
import { uuidv4 } from '@src/app/view/state/app/utils/uuid';

@Component({
	selector: 'cart',
	standalone: true,
	imports: [
		NgTemplateOutlet,
		CartIconComponent,
		AuthModalComponent,
		UserAddressesModalComponent,
	],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
	animations: [floatUp, cartExpandUp, scaleInOut], // !TODO-FIX: why must be imported for auth-modal to animate :leave
})
export class CartComponent {
	scrollService = inject(ScrollService);
	userStore = inject(userStore);
	settings = inject(settingsStore);
	invoiceStore = inject(invoiceStore);
	cart = inject(cartStore);

	productStore = inject(cartStore);
	cartItems = this.productStore.cartProductEntities;
	cartItemsMap = this.productStore.cartProductEntityMap;

	showAuth = signal(false);
	showAddressModal = signal(false);
	selectedAddress = signal<Address | undefined>(undefined);
	#selectedAddress = computed(
		() => this.selectedAddress() || this.userStore.defaultAddress(),
	);

	floatingCartExpanded = signal(false);

	removeFromCart(product: CartProduct) {
		this.productStore.removeFromCart(product);
	}

	incrementCart(product: CartProduct) {
		let existing = this.cartItemsMap()[product.variant.id];

		if (!existing) return;

		this.productStore.updateCart({
			...existing,
			quantity: existing.quantity + 1,
		});
	}

	decrementCart(product: CartProduct) {
		let existing = this.cartItemsMap()[product.variant.id];

		if (!existing) return;

		if (existing.quantity == 1) return;

		this.productStore.updateCart({
			...existing,
			quantity: existing.quantity - 1,
		});
	}

	toggleFloatCartExpanded() {
		this.floatingCartExpanded.update((v) => !v);
	}

	injector = inject(Injector);
	creationToken = uuidv4();
	checkout() {
		if (!this.userStore.isLoggedIn())
			return singleCallEffect({
				injector: this.injector,
				predicate: () => !this.showAuth(),
				init: () => this.showAuth.set(true),
				success: () => this.userStore.isLoggedIn() && this.checkout(),
			});

		if (this.settings.orderType() == 'delivery' && !this.#selectedAddress())
			return singleCallEffect({
				injector: this.injector,
				predicate: () => !this.showAddressModal(),
				init: () => this.showAddressModal.set(true),
				success: () => !!this.#selectedAddress() && this.checkout(),
			});

		this.invoiceStore
			.createInvoiceFromCartProducts({
				creationToken: this.creationToken,
				products: this.cart.cartProductEntities(),
				shippingAddressId: this.#selectedAddress()!.id,
				salesInvoiceType: this.settings.orderTypeId()!,
			})
			.subscribe(() => {
				this.cart.emptyCart();
				this.creationToken = uuidv4();
			});
	}
}
