import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo, InvoicesFilter } from '../../../domain';
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
	): Observable<GetInvoice> {
		return this.http.get<GetInvoice>(
			`${ENDPOINT}/api/store/invoices/${params.id}`,
			undefined,
			config,
		);
	}

	getInvoices(
		params: InvoicesFilter,
		config?: Config,
	): Observable<GetInvoice[]> {
		return this.http.get<GetInvoice[]>(
			`${ENDPOINT}/api/store/invoices`,
			{ params },
			config,
		);
	}

	createInvoice(
		params: { invoice: CreateInvoice; creationToken: string },
		config?: Config,
	): Observable<GetInvoice> {
		return this.http.post<GetInvoice>(
			`${ENDPOINT}/api/store/invoices`,
			params.invoice,
			{ headers: { creationToken: params.creationToken } },
			config,
		);
	}

	updateInvoice(
		params: UpdateInvoice,
		config?: Config,
	): Observable<GetInvoice> {
		return this.http.put<GetInvoice>(
			`${ENDPOINT}/api/store/invoices/${params.id}`,
			params,
			undefined,
			config,
		);
	}

	deleteInvoice(params: { id: number }, config?: Config): Observable<void> {
		return this.http.delete(
			`${ENDPOINT}/api/store/invoices/${params.id}`,
			undefined,
			config,
		);
	}
}
