import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, ProductsRepo } from '@src/app/features';

export class GetCategoriesUseCase implements UseCase<void, Category[]> {
	readonly productsRepo = inject(ProductsRepo);

	execute(config?: Config): Observable<Category[]> {
		let categories = this.productsRepo.getCategories(config).pipe(
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

export const getCategoriesUseCaseProvider = {
	provide: GetCategoriesUseCase,
	useFactory: () => new GetCategoriesUseCase(),
};
