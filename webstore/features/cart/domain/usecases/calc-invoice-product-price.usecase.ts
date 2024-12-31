import { SyncUseCase } from '@src/app/features';

export class CalcInvoiceProductPriceUseCase
	implements SyncUseCase<{ product: InvoiceProduct }, number>
{
	execute(params: { product: InvoiceProduct }, config?: Config): number {
		const price = params.product.price ?? 0,
			additionsMap = params.product.additions?.reduce(
				(acc, addition) => ({
					...acc,
					[addition.id]: addition,
				}),
				{} as { [k: string]: Addition },
			),
			additionsPrice =
				params.product.additions?.reduce((acc, productAddition) => {
					const addition = additionsMap?.[productAddition.id];

					if (!addition || !productAddition.with) return acc;

					return (
						acc +
						(addition.price ?? 0) * (productAddition.quantity ?? 0)
					);
				}, 0) ?? 0;

		return (price + additionsPrice) * params.product.quantity;
	}
}

export const CalcInvoiceProductPriceUseCaseProvider = {
	provide: CalcInvoiceProductPriceUseCase,
	useFactory: () => new CalcInvoiceProductPriceUseCase(),
};
