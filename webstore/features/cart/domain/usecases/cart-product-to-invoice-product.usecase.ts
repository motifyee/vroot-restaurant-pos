import { SyncUseCase } from '@src/app/features';

export class CartProductToInvoiceProductUseCase
	implements SyncUseCase<CartVariant, InvoiceProduct>
{
	execute(cartVariant: CartVariant): InvoiceProduct {
		return {
			productVariantId: cartVariant.variant.id,
			title: cartVariant.variant.title,
			quantity: cartVariant.quantity,
			price: cartVariant.variant.price,
			additions: cartVariant.additions,
			note: cartVariant.note,
			totalPrice: cartVariant.totalPrice,
		};
	}
}

export const CartProductToInvoiceProductUseCaseProvider = {
	provide: CartProductToInvoiceProductUseCase,
	useFactory: () => new CartProductToInvoiceProductUseCase(),
};
