import { Observable } from 'rxjs';
import { Invoice } from '../models/Invoice.model';
import { InvoiceIndexFilter } from '../usecases/get-invoices.usecase';

export abstract class InvoiceRepo {
	abstract getById(
		params: { id: number },
		config?: Config,
	): Observable<Invoice>;

	abstract getInvoices(
		params: InvoiceIndexFilter,
		config?: Config,
	): Observable<Invoice[]>;

	abstract create(
		params: { invoice: Invoice; creationToken: string },
		config?: Config,
	): Observable<Invoice>;

	abstract update(params: Invoice, config?: Config): Observable<Invoice>;

	abstract delete(params: Invoice, config?: Config): Observable<Invoice>;
}
