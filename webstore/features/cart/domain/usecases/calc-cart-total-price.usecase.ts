import { inject } from '@angular/core';
import { SyncUseCase } from '@src/app/features';
import { CalcCartProductPriceUseCase } from './calc-cart-product-price.usecase';

export class CalcCartTotalPriceUseCase
	implements SyncUseCase<{ products: CartVariant[] }, number>
{
	productPrice = inject(CalcCartProductPriceUseCase);

	execute(params: { products: CartVariant[] }, config?: Config): number {
		return params.products.reduce((acc, p) => {
			return acc + this.productPrice.execute({ product: p });
		}, 0);
	}
}

export const CalcCartTotalPriceUseCaseProvider = {
	provide: CalcCartTotalPriceUseCase,
	useFactory: () => new CalcCartTotalPriceUseCase(),
};
