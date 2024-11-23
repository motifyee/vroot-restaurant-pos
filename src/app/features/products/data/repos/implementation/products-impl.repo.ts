import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProductsRepo } from '../../../domain';
import { ENV, HttpService } from '@src/app/core';

export class ProductsImplRepo implements ProductsRepo {
	http = inject(HttpService);

	getCategories(config?: Config): Observable<Category[]> {
		return this.http
			.get<Category[]>(
				`${ENV.endpoint}/api/store/9/menu`,
				undefined,
				config,
			)
			.pipe(map((res) => res));
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
