import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, Injector, signal } from '@angular/core';
import { CartIconComponent } from './icons/cart-icon.component';
import { ScrollService } from '../../services/scroll.service';
import { cartExpandUp, floatUp } from '../../animations/float-up.animation';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { settingsStore, userStore, invoiceStore } from '@webstore/state';
import { UserAddressesModalComponent } from '../user-addresses-modal/user-addresses-modal.component';
import { scaleInOut } from '../../animations/scale-in-out.animation';
import { singleCallEffect } from '@src/app/core';
import { CartItemsComponent } from '@webstore/components/cart/components/cart-items/cart-items.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';

@Component({
	selector: 'cart',
	imports: [
		NgTemplateOutlet,
		CartIconComponent,
		AuthModalComponent,
		UserAddressesModalComponent,
		CartItemsComponent,
		ButtonModule,
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
	totalPrice = computed(
		() => this.invoiceStore.activeInvoice()?.totalPrice || 0,
	);
	cartItems = computed(
		() => this.invoiceStore.activeInvoice?.()?.products || [],
	);

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
	gotoCheckout() {
		// ensure user is logged in
		if (!this.userStore.isLoggedIn())
			return singleCallEffect({
				injector: this.injector,
				init: () => this.showAuth.set(true),
				predicate: () => !this.showAuth(),
				success: () =>
					this.userStore.isLoggedIn() && this.gotoCheckout(),
			});

		// ensure user has selected an address
		if (
			this.settings.defaultInvoiceType() == InvoiceType.delivery &&
			!this.#selectedAddress()
		)
			return singleCallEffect({
				injector: this.injector,
				init: () => this.showAddressModal.set(true),
				predicate: () => !this.showAddressModal(),
				success: () => !!this.#selectedAddress() && this.gotoCheckout(),
			});

		// navigate to checkout
		this.router.navigate(['/checkout']);
	}
}
