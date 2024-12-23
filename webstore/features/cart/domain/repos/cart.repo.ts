import { Observable } from 'rxjs';

export type InvoicesFilter = {
	pageNumber: number;
	pageSize: number;
};

export abstract class CartRepo {
	abstract getCategories(
		branchId: number,
		config?: Config,
	): Observable<Category[]>;

	// ###########################################################################

	abstract getInvoiceById(
		params: { id: number },
		config?: Config,
	): Observable<WebstoreInvoice>;

	abstract getInvoices(
		params: InvoicesFilter,
		config?: Config,
	): Observable<WebstoreInvoice[]>;

	abstract createInvoice(
		params: { invoice: WebstoreInvoice; creationToken: string },
		config?: Config,
	): Observable<WebstoreInvoice>;

	abstract updateInvoice(
		params: WebstoreInvoice,
		config?: Config,
	): Observable<WebstoreInvoice>;

	abstract deleteInvoice(
		params: WebstoreInvoice,
		config?: Config,
	): Observable<WebstoreInvoice>;
}
