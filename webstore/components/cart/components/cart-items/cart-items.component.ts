import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
} from '@angular/core';
import { CalcInvoiceProductPriceUseCase } from '@webstore/features';
import { invoiceStore } from '@webstore/state';
@Component({
	selector: 'cart-items',
	imports: [],
	templateUrl: './cart-items.component.html',
	styleUrl: './cart-items.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsComponent {
	readonly invoiceStore = inject(invoiceStore);

	readonly showControls = input<boolean>(false);
	readonly products = input<InvoiceProduct[] | undefined>(undefined);

	readonly items = computed(() => {
		if (this.products()) return this.products();

		return this.invoiceStore.activeInvoice()?.products || [];
	});

	readonly trackByProduct = (product: InvoiceProduct) =>
		`${product.productVariantId}
    ${product.additions?.map((a) => `${a.id}-${a.quantity}`).join(',')}`;

	readonly productPrice = inject(CalcInvoiceProductPriceUseCase);
	readonly calcPrice = (product: InvoiceProduct) =>
		this.productPrice.execute({ product });
}
