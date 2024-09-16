import { map, Observable } from 'rxjs';
import { InvoiceRepo } from '../../../repos';
import { inject } from '@angular/core';
import { ENV, HttpService } from '@core';

export class InvoiceImplRepo implements InvoiceRepo {
	#http = inject(HttpService);

	getById(params: { id: number }, config?: Config): Observable<Invoice> {
		return this.#http
			.get<Response<Invoice>>(
				`${ENV.endpoint}/api/invoices/${params.id}`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!));
	}

	getInvoices(
		{
			from,
			to,
			pageNumber,
			pageSize,
			fromBranch,
			toBranch,
			deliveryId,
			isClosed,
		}: {
			from: string;
			to: string;
			pageNumber: number;
			pageSize: number;
			fromBranch: number;
			toBranch: number;
			deliveryId: number;
			isClosed: boolean;
		},
		config?: Config,
	): Observable<Invoice[]> {
		return this.#http
			.get<Response<Invoice[]>>(
				`${ENV.endpoint}/api/invoices`,
				{
					params: {
						from,
						to,
						pageSize,
						pageNumber,
						fromBranch,
						toBranch,
						deliveryId,
						isClosed,
					},
				},
				config,
			)
			.pipe(map((res) => res.data!));
	}

	create(params: Invoice, config?: Config): Observable<Invoice> {
		return this.#http
			.post<Response<{ id: number }>>(
				`${ENV.endpoint}/api/invoices`,
				params,
				undefined,
				config,
			)
			.pipe(map((res) => ({ ...params, id: res.data!.id } as Invoice)));
	}

	update(params: Invoice, config?: Config): Observable<Invoice> {
		return this.#http
			.put<Response<{ id: number }>>(
				`${ENV.endpoint}/api/invoices/${params.id}`,
				params,
				undefined,
				config,
			)
			.pipe(map((res) => params));
	}

	delete(params: { id: number }, config?: Config): Observable<void> {
		return this.#http.delete(
			`${ENV.endpoint}/api/invoices/${params.id}`,
			undefined,
			config,
		);
	}
}
