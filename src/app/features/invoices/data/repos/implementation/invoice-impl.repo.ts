import { map, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { InvoiceRepo } from '../../../domain';
import { ENV, HttpService } from '@src/app/core';
import { Invoice } from '../../../domain/models/Invoice.model';
import { unum, uuidv4 } from '@src/app/view/state/app/utils/uuid';

export class InvoiceImplRepo implements InvoiceRepo {
	http = inject(HttpService);

	getById(params: { id: number }, config?: Config): Observable<Invoice> {
		return this.http
			.get<
				Response<Invoice>
			>(`${ENV.endpoint}/api/invoices/${params.id}`, undefined, config)
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
		return this.http
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

	create(
		params: { invoice: Invoice; creationToken: string },
		config?: Config,
	): Observable<Invoice> {
		return of({
			...params.invoice,
			id: unum(),
		} as Invoice);
		// return this.http
		// 	.post<Response<{ id: number }>>(
		// 		`${ENV.endpoint}/api/invoices`,
		// 		params.invoice,
		// 		{ headers: { creationToken: params.creationToken } },
		// 		config,
		// 	)
		// 	.pipe(
		// 		map(
		// 			(res) =>
		// 				({ ...params.invoice, id: res.data!.id } as Invoice),
		// 		),
		// 	);
	}

	update(params: Invoice, config?: Config): Observable<Invoice> {
		return this.http
			.put<
				Response<{ id: number }>
			>(`${ENV.endpoint}/api/invoices/${params.id}`, params, undefined, config)
			.pipe(map((res) => params));
	}

	delete(params: Invoice, config?: Config): Observable<Invoice> {
		return this.http
			.delete(
				`${ENV.endpoint}/api/invoices/${params.id}`,
				undefined,
				config,
			)
			.pipe(map(() => params));
	}
}
