import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ProductsRepo } from '../../../domain';
import { ENV, HttpService } from '@src/app/core';
import { settingsStore } from '@src/app/features/settings';

export class ProductsImplRepo implements ProductsRepo {
	http = inject(HttpService);
	settings = inject(settingsStore);

	getCategories(config?: Config): Observable<Category[]> {
		let branchId = this.settings.selectedBranch?.()?.id ?? '-1';

		return this.http
			.get<
				Category[]
			>(`${ENV.endpoint}/api/store/${branchId}/menu`, undefined, config)
			.pipe(map((res) => res));
	}

	getVariants(config?: Config): Observable<ProductVariant[]> {
		return this.http
			.get<
				Response<ProductVariant[]>
			>(`${ENV.endpoint}/api/products/variants`, undefined, config)
			.pipe(map((res) => res.data!));
	}
}
