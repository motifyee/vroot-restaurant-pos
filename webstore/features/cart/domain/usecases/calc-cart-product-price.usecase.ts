import { SyncUseCase } from '@src/app/features';

export class CalcCartProductPriceUseCase
	implements SyncUseCase<{ product: CartVariant }, number>
{
	execute(params: { product: CartVariant }, config?: Config): number {
		const variant = params.product.variant,
			price = variant.price ?? 0,
			additionsMap = variant.additions?.reduce(
				(acc, addition) => ({
					...acc,
					[addition.id]: addition,
				}),
				{} as { [k: string]: Addition },
			),
			additionsPrice =
				params.product.additions?.reduce((acc, productAddition) => {
					const addition = additionsMap[productAddition.id];

					if (!addition || !productAddition.with) return acc;

					return (
						acc +
						(addition.price ?? 0) * (productAddition.quantity ?? 0)
					);
				}, 0) ?? 0;

		return (price + additionsPrice) * params.product.quantity;
	}
}

export const CalcCartProductPriceUseCaseProvider = {
	provide: CalcCartProductPriceUseCase,
	useFactory: () => new CalcCartProductPriceUseCase(),
};
