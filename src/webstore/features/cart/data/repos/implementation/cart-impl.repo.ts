import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo } from '../../../domain';
import { ENDPOINT, HttpService } from '@src/app/core';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';

export class CartImplRepo implements CartRepo {
	http = inject(HttpService);

	getCategories(branchId: number, config?: Config): Observable<Category[]> {
		return this.http
			.get<
				Category[]
			>(`${ENDPOINT}/api/store/${branchId}/menu`, undefined, config)
			.pipe(map((res) => res));
	}

	// ###########################################################################

	getInvoiceById(
		params: { id: number },
		config?: Config,
	): Observable<Invoice> {
		return this.http.get<Invoice>(
			`${ENDPOINT}/api/store/invoices/${params.id}`,
			undefined,
			config,
		);
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
		return this.http.get<Invoice[]>(
			`${ENDPOINT}/api/store/invoices`,
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
		);
	}

	createInvoice(
		params: { invoice: Invoice; creationToken: string },
		config?: Config,
	): Observable<Invoice> {
		return this.http
			.post<{
				id: number;
			}>(
				`${ENDPOINT}/api/store/invoices`,
				params.invoice,
				{ headers: { creationToken: params.creationToken } },
				config,
			)
			.pipe(map((res) => ({ ...params.invoice, id: res.id }) as Invoice));
	}

	updateInvoice(params: Invoice, config?: Config): Observable<Invoice> {
		return this.http
			.put<{
				id: number;
			}>(
				`${ENDPOINT}/api/store/invoices/${params.id}`,
				params,
				undefined,
				config,
			)
			.pipe(map((res) => params));
	}

	deleteInvoice(params: Invoice, config?: Config): Observable<Invoice> {
		return this.http
			.delete(
				`${ENDPOINT}/api/store/invoices/${params.id}`,
				undefined,
				config,
			)
			.pipe(map(() => params));
	}
}
