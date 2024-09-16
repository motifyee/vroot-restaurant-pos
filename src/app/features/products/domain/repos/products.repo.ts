import { Observable } from 'rxjs';

export abstract class ProductsRepo {
	abstract getCategories(config?: Config): Observable<Category[]>;

	abstract getVariants(config?: Config): Observable<ProductVariant[]>;
}
