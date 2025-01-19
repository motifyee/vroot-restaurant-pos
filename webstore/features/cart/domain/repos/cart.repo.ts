import { Observable } from 'rxjs';

export type InvoicesFilter = {
	pageNumber: number;
	pageSize: number;
	active?: boolean;
	usualOrder?: boolean;
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
	): Observable<GetInvoice>;

	abstract getInvoices(
		params: InvoicesFilter,
		config?: Config,
	): Observable<GetInvoice[]>;

	abstract createInvoice(
		params: { invoice: CreateInvoice; creationToken: string },
		config?: Config,
	): Observable<GetInvoice>;

	abstract updateInvoice(
		params: UpdateInvoice,
		config?: Config,
	): Observable<GetInvoice>;

	abstract deleteInvoice(
		params: { id: number },
		config?: Config,
	): Observable<void>;
}
