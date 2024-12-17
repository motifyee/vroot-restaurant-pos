import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo } from '../../../domain';
import { ENDPOINT, HttpService } from '@src/app/core';

export class CartImplRepo implements CartRepo {
	http = inject(HttpService);

	getCategories(branchId: number, config?: Config): Observable<Category[]> {
		return this.http
			.get<
				Category[]
			>(`${ENDPOINT}/api/store/${branchId}/menu`, undefined, config)
			.pipe(map((res) => res));
	}
}
