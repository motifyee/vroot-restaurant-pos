import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Injector, signal } from '@angular/core';
import { productStore } from '@src/app/features/products';
import { CartIconComponent } from './icons/cart-icon.component';
import { ScrollService } from '../../../../services/scroll.service';
import { floatUp } from '../../../../animations/float.animation';
import { AuthModalComponent } from '../../../../components/auth-modal/auth-modal.component';
import { settingsStore, userStore } from '@src/app/features';
import { UserAddressesModalComponent } from '../../../../components/user-addresses-modal/user-addresses-modal.component';
import { scaleInOut } from '../../../../animations/scaleInOut.animation';
import { singleCallEffect } from '@src/app/core';

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
	animations: [floatUp, scaleInOut], // !TODO-FIX: why must be imported for auth-modal to animate :leave
})
export class CartComponent {
	scrollService = inject(ScrollService);
	userStore = inject(userStore);
	settings = inject(settingsStore);

	productStore = inject(productStore);
	cartItems = this.productStore.cartProductsEntities;
	cartItemsMap = this.productStore.cartProductsEntityMap;

	showAuth = signal(false);
	showAddressModal = signal(false);
	selectedAddress = signal<Address | undefined>(undefined);
	#selectedAddress = computed(
		() => this.selectedAddress() || this.userStore.defaultAddress(),
	);

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

	expandCart() {
		throw new Error('Method not implemented.');
	}

	injector = inject(Injector);
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
	}
}
