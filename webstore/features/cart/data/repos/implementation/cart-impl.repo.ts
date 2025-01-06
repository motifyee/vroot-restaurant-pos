import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo } from '../../../domain';
import { ENDPOINT, HttpService } from '@src/app/core';
import { CategoryProductMapper } from '../mappers/product.mapper';

export class CartImplRepo implements CartRepo {
	http = inject(HttpService);
	productMapper = new CategoryProductMapper();

	getCategories(branchId: number, config?: Config): Observable<Category[]> {
		return this.http
			.get<
				CategoryDTO[]
			>(`${ENDPOINT}/api/store/${branchId}/menu`, undefined, config)
			.pipe(
				map((res) => {
					return res.map((c) => ({
						...c,
						products: c.products
							.map((p) => this.productMapper.mapFrom(p))
							.flat(),
					}));
				}),
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
