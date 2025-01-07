import { SyncUseCase } from '@src/app/features';
import { deepMatch } from '@src/app/view/state/app/utils/utils';

type UseCaseParams =
	| { product: InvoiceProduct; list: InvoiceProduct[] }
	| { product: CreateInvoiceProduct; list: CreateInvoiceProduct[] };

export class FindMatchingProductIndexUseCase
	implements SyncUseCase<UseCaseParams, number>
{
	execute(params: UseCaseParams, config?: Config): number {
		const { product, list } = params;

		return list.findIndex((p: InvoiceProduct | CreateInvoiceProduct) => {
			const idsMatch = p.productVariantId === product.productVariantId;
			const additionsMatch = deepMatch(p.additions, product.additions);

			return idsMatch && additionsMatch;
		});
	}
}

export const FindMatchingProductIndexUseCaseProvider = {
	provide: FindMatchingProductIndexUseCase,
	useFactory: () => new FindMatchingProductIndexUseCase(),
};
