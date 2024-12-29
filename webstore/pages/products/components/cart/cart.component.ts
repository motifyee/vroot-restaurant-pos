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
import { CartItemsComponent } from '@webstore/components/cart-items/cart-items.component';
import { Router } from '@angular/router';

@Component({
	selector: 'cart',
	imports: [
		NgTemplateOutlet,
		CartIconComponent,
		AuthModalComponent,
		UserAddressesModalComponent,
		CartItemsComponent,
	],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
	animations: [floatUp, cartExpandUp, scaleInOut],
})
export class CartComponent {
	router = inject(Router);

	scrollService = inject(ScrollService);
	userStore = inject(userStore);
	settings = inject(settingsStore);
	invoiceStore = inject(invoiceStore);

	cart = inject(cartStore);
	cartItems = this.cart.products;

	showAuth = signal(false);
	showAddressModal = signal(false);
	selectedAddress = signal<Address | undefined>(undefined);
	#selectedAddress = computed(
		() => this.selectedAddress() || this.userStore.defaultAddress(),
	);

	floatingCartExpanded = signal(false);

	toggleFloatCartExpanded() {
		this.floatingCartExpanded.update((v) => !v);
	}

	injector = inject(Injector);
	checkout() {
		if (!this.userStore.isLoggedIn())
			return singleCallEffect({
				injector: this.injector,
				init: () => this.showAuth.set(true),
				predicate: () => !this.showAuth(),
				success: () => this.userStore.isLoggedIn() && this.checkout(),
			});

		if (this.settings.orderType() == 'delivery' && !this.#selectedAddress())
			return singleCallEffect({
				injector: this.injector,
				init: () => this.showAddressModal.set(true),
				predicate: () => !this.showAddressModal(),
				success: () => !!this.#selectedAddress() && this.checkout(),
			});

		this.router.navigate(['/checkout']);
	}
}
