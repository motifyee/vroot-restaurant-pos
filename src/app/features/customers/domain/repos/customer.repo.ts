import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { Classification } from '../models/classification.model';

export abstract class CustomerRepo {
	abstract test(): Observable<Customer>;

	abstract getAll(
		params: {
			pageNumber: number;
			pageSize: number;
		},
		config?: Config,
	): Observable<Customer[]>;

	abstract getById(
		params: { customerId: string },
		config?: Config,
	): Observable<Customer>;

	abstract create(
		params: CustomerEntity,
		config?: Config,
	): Observable<Customer>;

	abstract update(
		params: CustomerEntity,
		config?: Config,
	): Observable<Customer>;

	abstract deleteById(
		params: { customerId: string },
		config?: Config,
	): Observable<undefined>;

	abstract search(
		params: {
			query: string;
			phone: string;
		},
		config?: Config,
	): Observable<Customer[]>;

	abstract getClassifications(config?: Config): Observable<Classification[]>;
}
