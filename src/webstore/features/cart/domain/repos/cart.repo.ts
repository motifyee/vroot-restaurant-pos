import { Observable } from 'rxjs';

export abstract class CartRepo {
	abstract getCategories(
		branchId: number,
		config?: Config,
	): Observable<Category[]>;
}
