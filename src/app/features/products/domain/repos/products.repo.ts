import { Observable } from 'rxjs';

export abstract class ProductsRepo {
	abstract getCategories(
		branchId: number,
		config?: Config,
	): Observable<Category[]>;

	abstract getVariants(config?: Config): Observable<ProductVariant[]>;
}
