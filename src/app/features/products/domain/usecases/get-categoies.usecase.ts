import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, ProductsRepo } from '@src/app/features';

export class GetCategoriesUseCase
	implements UseCase<{ branchId: number }, Category[]>
{
	readonly productsRepo = inject(ProductsRepo);

	execute(
		params: { branchId: number },
		config?: Config,
	): Observable<Category[]> {
		let categories = this.productsRepo
			.getCategories(params.branchId, config)
			.pipe(
				map((c) =>
					c.map((c) => ({
						...c,
						products: c.products.map(referenceProduct),
					})),
				),
			);
		return categories;
	}
}

// refrence the product to its variants
function referenceProduct(product: Product): Product {
	return {
		...product,
		variants: product.variants?.map((v) => ({
			...v,
			product,
		})),
	};
}

export const GetCategoriesUseCaseProvider = {
	provide: GetCategoriesUseCase,
	useFactory: () => new GetCategoriesUseCase(),
};
