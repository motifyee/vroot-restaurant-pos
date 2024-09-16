import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { ENV, HttpService } from '@core';
import { CustomerImplMapper } from '../mappers/customer.mapper';
import { ClassificationImplMapper } from '../mappers/classification.mapper';
import { CustomerRepo, Classification, Customer } from '@features';

type Pager = { pageNumber: number; pageSize: number };

@Injectable({
	providedIn: 'root',
})
export class CustomerImplRepo implements CustomerRepo {
	http = inject(HttpService);
	customerMapper = new CustomerImplMapper();
	classificationmapper = new ClassificationImplMapper();

	test(): Observable<Customer> {
		return of(
			new Customer(
				{
					id: '123',
					firstName: 'customer',
					lastName: 'last',
					phone: '010',
					classId: 12,
				},
				new Classification({ id: 234, color: 'cls', name: 'cool' }),
			),
		).pipe(delay(1000));
	}

	getAll(
		{ pageNumber, pageSize }: Pager,
		config?: Config,
	): Observable<Customer[]> {
		return this.http
			.get<Response<CustomerEntity[]>>(
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
			.get<Response<CustomerEntity>>(
				`${ENV.endpoint}/api/cusotmers/${params.customerId}`,
				undefined,
				config,
			)
			.pipe(map((res) => this.customerMapper.mapFrom(res.data!)));
	}

	create(params: CustomerEntity, config?: Config): Observable<Customer> {
		return this.http
			.post<Response<{ id: string }>>(
				`${ENV.endpoint}/api/customers`,
				params,
				undefined,
				config,
			)
			.pipe(
				map((res) =>
					this.customerMapper.mapFrom({
						...params,
						id: res.data!.id,
					}),
				),
			);
	}

	update(params: CustomerEntity, config?: Config): Observable<Customer> {
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
			.get<Response<CustomerEntity[]>>(
				`${ENV.endpoint}/api/customers`,
				{ headers: { query, phone } },
				config,
			)
			.pipe(map((res) => res.data!.map(this.customerMapper.mapFrom)));
	}

	getClassifications(config?: Config): Observable<Classification[]> {
		return this.http
			.get<Response<ClassificationEntity[]>>(
				`${ENV.endpoint}/api/customers/classes`,
				undefined,
				config,
			)
			.pipe(
				map((res) => res.data!.map(this.classificationmapper.mapFrom)),
			);
	}
}
