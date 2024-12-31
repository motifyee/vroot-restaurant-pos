import { SyncUseCase } from '@src/app/features';

export class InvoiceProductToCartProductUseCase
	implements SyncUseCase<InvoiceProduct, CartVariant>
{
	execute(invoiceProduct: InvoiceProduct, config?: Config): CartVariant {
		return {
			variant: {
				id: invoiceProduct.productVariantId,
				price: invoiceProduct.price ?? 0,
				title: invoiceProduct.title ?? '',
				additions: [],
				product: {
					title: '',
					variants: [],
					id: '',
					categoryId: 0,
					sn: 0,
				},
			},
			quantity: invoiceProduct.quantity,
			additions: invoiceProduct.additions,
			note: invoiceProduct.note,
			totalPrice: invoiceProduct.totalPrice,
		};
	}
}

export const InvoiceProductToCartProductUseCaseProvider = {
	provide: InvoiceProductToCartProductUseCase,
	useFactory: () => new InvoiceProductToCartProductUseCase(),
};
