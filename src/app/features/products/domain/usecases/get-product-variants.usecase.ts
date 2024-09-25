import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, ProductsRepo } from '@src/app/features';

export class GetProductVariantsUseCase
	implements UseCase<void, ProductVariant[]>
{
	readonly productsRepo = inject(ProductsRepo);

	execute(config?: Config): Observable<ProductVariant[]> {
		return this.productsRepo.getVariants(config);
	}
}

export const getProductVariantsUseCaseProvider = {
	provide: GetProductVariantsUseCase,
	useFactory: () => new GetProductVariantsUseCase(),
};
