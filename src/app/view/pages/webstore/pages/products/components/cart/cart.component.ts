import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { productStore } from '@src/app/features/products';
import { CartIconComponent } from './icons/cart-icon.component';
import { ScrollService } from '../../../../services/scroll.service';
import { float } from '../../../../animations/float.animation';
import { AuthModalComponent } from '../../../../components/auth-modal/auth-modal.component';
import { userStore } from '@src/app/features';
import { scaleInOut } from '../../../../animations/scaleInOut.animation';

@Component({
	selector: 'cart',
	standalone: true,
	imports: [NgTemplateOutlet, CartIconComponent, AuthModalComponent],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
	animations: [float, scaleInOut],
})
export class CartComponent {
	scrollService = inject(ScrollService);
	userStore = inject(userStore);

	productStore = inject(productStore);
	cartItems = this.productStore.cartProductsEntities;
	cartItemsMap = this.productStore.cartProductsEntityMap;

	showAuth = signal(false);

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

	checkout() {
		if (!this.userStore.isLoggedIn()) {
			this.showAuth.set(true);
			return;
		}
	}
}
