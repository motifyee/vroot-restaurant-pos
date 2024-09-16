import { map, Observable } from 'rxjs';
import { ProductsRepo } from '../../../domain/repos';
import { inject } from '@angular/core';
import { ENV, HttpService } from '@core';

export class ProductsImplRepo implements ProductsRepo {
	http = inject(HttpService);

	getCategories(config?: Config): Observable<Category[]> {
		return this.http
			.get<Response<Category[]>>(
				`${ENV.endpoint}/api/categories`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!));
	}
	getVariants(config?: Config): Observable<ProductVariant[]> {
		return this.http
			.get<Response<ProductVariant[]>>(
				`${ENV.endpoint}/api/products/variants`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!));
	}
}
