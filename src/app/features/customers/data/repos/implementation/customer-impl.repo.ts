import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { CustomerImplMapper } from '../mappers/customer.mapper';
import { CustomerRepo, Customer } from '@src/app/features';
import { ENV, HttpService } from '@src/app/core';

type Pager = { pageNumber: number; pageSize: number };

@Injectable({
	providedIn: 'root',
})
export class CustomerImplRepo implements CustomerRepo {
	http = inject(HttpService);
	customerMapper = new CustomerImplMapper();

	test(): Observable<Customer> {
		return of({
			id: '123',
			name: 'customer',
			lastName: 'last',
			phone: '010',
			classificationId: 12,
			classification: { id: 234, color: 'cls', title: 'cool' },
		}).pipe(delay(1000));
	}

	getAll(
		{ pageNumber, pageSize }: Pager,
		config?: Config,
	): Observable<Customer[]> {
		return this.http
			.get<Response<CustomerDTO[]>>(
				`${ENV.endpoint}/api/customers`,
				{
					headers: { pageNumber, pageSize },
				},
				config,
			)
			.pipe(map((res) => res.data!.map(this.customerMapper.mapFrom)));
	}

	getById(
		params: { customerId: string },
		config?: Config,
	): Observable<Customer> {
		return this.http
			.get<
				Response<CustomerDTO>
			>(`${ENV.endpoint}/api/cusotmers/${params.customerId}`, undefined, config)
			.pipe(map((res) => this.customerMapper.mapFrom(res.data!)));
	}

	create(params: CustomerDTO, config?: Config): Observable<Customer> {
		return this.http
			.post<{
				id: string;
				token: string;
			}>(
				`${ENV.endpoint}/api/accounts/store/register`,
				params,
				undefined,
				config,
			)
			.pipe(
				map((res) =>
					this.customerMapper.mapFrom({
						...params,
						id: res.id,
					}),
				),
			);
	}

	update(params: CustomerDTO, config?: Config): Observable<Customer> {
		return this.http
			.put(`${ENV.endpoint}/api/customers`, params, undefined, config)
			.pipe(map(() => this.customerMapper.mapFrom(params)));
	}

	deleteById(
		params: { customerId: string },
		config?: Config,
	): Observable<undefined> {
		return this.http.delete(
			`${ENV.endpoint}/api/customers/${params.customerId}`,
			undefined,
			config,
		);
	}

	search(
		{ query, phone }: { query: string; phone: string },
		config?: Config,
	): Observable<Customer[]> {
		return this.http
			.get<
				Response<CustomerDTO[]>
			>(`${ENV.endpoint}/api/customers`, { headers: { query, phone } }, config)
			.pipe(map((res) => res.data!.map(this.customerMapper.mapFrom)));
	}

	getClassifications(config?: Config): Observable<ClassificationDTO[]> {
		return this.http
			.get<
				Response<ClassificationDTO[]>
			>(`${ENV.endpoint}/api/customers/classes`, undefined, config)
			.pipe(map((res) => res.data!)); //.map(this.classificationmapper.mapFrom)),
	}
}
