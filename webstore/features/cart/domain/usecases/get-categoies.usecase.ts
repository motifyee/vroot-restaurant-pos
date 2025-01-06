import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '@src/app/features';
import { CartRepo } from '../repos/cart.repo';
import { CategoryProductMapper } from '../../data/repos/mappers/product.mapper';

export class GetCategoriesUseCase
	implements UseCase<{ branchId: number }, Category[]>
{
	readonly productsRepo = inject(CartRepo);

	execute(
		params: { branchId: number },
		config?: Config,
	): Observable<Category[]> {
		let categories = this.productsRepo.getCategories(
			params.branchId,
			config,
		);
		// .pipe(
		// 	map((c) =>
		// 		c.map((c) => ({
		// 			...c,
		// 			products: c.products.map(p=>mapper.mapFrom(p)),
		// 		})),
		// 	),
		// );
		return categories;
	}
}

export const GetCategoriesUseCaseProvider = {
	provide: GetCategoriesUseCase,
	useFactory: () => new GetCategoriesUseCase(),
};
