import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
} from '@angular/core';
import { CalcCartProductPriceUseCase } from '@webstore/features';
import { cartStore } from '@webstore/state';

@Component({
	selector: 'cart-items',
	imports: [],
	templateUrl: './cart-items.component.html',
	styleUrl: './cart-items.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsComponent {
	showControls = input<boolean>(false);

	cart = inject(cartStore);
	cartItems = this.cart.products;

	productPrice = inject(CalcCartProductPriceUseCase);
	calcPrice = (product: CartVariant) =>
		this.productPrice.execute({ product });
}
