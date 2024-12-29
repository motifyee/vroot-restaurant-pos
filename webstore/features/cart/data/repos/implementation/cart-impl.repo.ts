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
			.pipe(
				map((res) =>
					res.map((c) => ({
						...c,
						products: c.products.map((p) => ({
							...p,
							variants: p.variants?.map((v) => ({
								...v,
								additions: (<any>v).note ?? [],
							})),
						})),
					})),
				),
			);
	}

	// ###########################################################################

	getInvoiceById(
		params: { id: number },
		config?: Config,
	): Observable<WebstoreInvoice> {
		return this.http.get<WebstoreInvoice>(
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
	): Observable<WebstoreInvoice[]> {
		return this.http.get<WebstoreInvoice[]>(
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
		params: { invoice: WebstoreInvoice; creationToken: string },
		config?: Config,
	): Observable<WebstoreInvoice> {
		return this.http
			.post<{
				id: number;
			}>(
				`${ENDPOINT}/api/store/invoices`,
				params.invoice,
				{ headers: { creationToken: params.creationToken } },
				config,
			)
			.pipe(
				map(
					(res) =>
						({
							id: res.id,
							...params.invoice,
						}) as WebstoreInvoice,
				),
			);
	}

	updateInvoice(
		params: WebstoreInvoice,
		config?: Config,
	): Observable<WebstoreInvoice> {
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

	deleteInvoice(
		params: WebstoreInvoice,
		config?: Config,
	): Observable<WebstoreInvoice> {
		return this.http
			.delete(
				`${ENDPOINT}/api/store/invoices/${params.id}`,
				undefined,
				config,
			)
			.pipe(map(() => params));
	}
}
