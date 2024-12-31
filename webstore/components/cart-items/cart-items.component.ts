import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
} from '@angular/core';
import {
	CalcInvoiceProductPriceUseCase,
	CartProductToInvoiceProductUseCase,
} from '@webstore/features';
import { cartStore } from '@webstore/state';

@Component({
	selector: 'cart-items',
	imports: [],
	templateUrl: './cart-items.component.html',
	styleUrl: './cart-items.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsComponent {
	cartProductToInvoiceProduct = inject(CartProductToInvoiceProductUseCase);
	cart = inject(cartStore);

	showControls = input<boolean>(false);
	products = input<InvoiceProduct[] | undefined>(undefined);

	items = computed(() => {
		if (this.products()) return this.products();

		return this.cart
			.products()
			.map(this.cartProductToInvoiceProduct.execute);
	});

	cartItems = this.cart.products;

	productPrice = inject(CalcInvoiceProductPriceUseCase);
	calcPrice = (product: InvoiceProduct) =>
		this.productPrice.execute({ product });
}
