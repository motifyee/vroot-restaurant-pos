import { Component, inject } from '@angular/core';
import { productStore } from '@src/app/features/products';

@Component({
	selector: 'cart',
	standalone: true,
	imports: [],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.scss',
})
export class CartComponent {
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
}
