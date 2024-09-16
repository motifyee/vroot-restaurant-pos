import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, ProductsRepo } from '@features';

export class GetCategoriesUseCase implements UseCase<void, Category[]> {
	readonly productsRepo = inject(ProductsRepo);

	execute(config?: Config): Observable<Category[]> {
		return this.productsRepo.getCategories(config);
	}
}

export const getCategoriesUseCaseProvider = {
	provide: GetCategoriesUseCase,
	useFactory: () => new GetCategoriesUseCase(),
};
