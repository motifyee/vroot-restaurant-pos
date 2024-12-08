import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProductsRepo } from '../../../domain';
import { ENDPOINT, HttpService } from '@src/app/core';

export class ProductsImplRepo implements ProductsRepo {
	http = inject(HttpService);

	getCategories(branchId: number, config?: Config): Observable<Category[]> {
		// let branchId = this.settings.selectedBranch?.()?.id ?? '-1';

		return this.http
			.get<
				Category[]
			>(`${ENDPOINT}/api/store/${branchId}/menu`, undefined, config)
			.pipe(map((res) => res));
	}

	getVariants(config?: Config): Observable<ProductVariant[]> {
		return this.http
			.get<
				Response<ProductVariant[]>
			>(`${ENDPOINT}/api/products/variants`, undefined, config)
			.pipe(map((res) => res.data!));
	}
}
