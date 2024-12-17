import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
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
	): Observable<Invoice>;

	abstract getInvoices(
		params: InvoicesFilter,
		config?: Config,
	): Observable<Invoice[]>;

	abstract createInvoice(
		params: { invoice: Invoice; creationToken: string },
		config?: Config,
	): Observable<Invoice>;

	abstract updateInvoice(
		params: Invoice,
		config?: Config,
	): Observable<Invoice>;

	abstract deleteInvoice(
		params: Invoice,
		config?: Config,
	): Observable<Invoice>;
}
