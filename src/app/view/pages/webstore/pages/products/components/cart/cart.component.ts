import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { productStore } from '@src/app/features/products';
import { CartIconComponent } from './icons/cart-icon.component';
import { ScrollService } from '../../../../services/scroll.service';
import { float } from '../../../../animations/float.animation';

@Component({
	selector: 'cart',
	standalone: true,
	imports: [NgTemplateOutlet, CartIconComponent],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
	animations: [float],
})
export class CartComponent {
	scrollService = inject(ScrollService);

	productStore = inject(productStore);
	cartItems = this.productStore.cartProductsEntities;
	cartItemsMap = this.productStore.cartProductsEntityMap;

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

	openCart() {
		throw new Error('Method not implemented.');
	}
}
