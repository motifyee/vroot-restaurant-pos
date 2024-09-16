import { Observable } from 'rxjs';

export abstract class InvoiceRepo {
	abstract getById(
		params: { id: number },
		config?: Config,
	): Observable<Invoice>;

	abstract getInvoices(
		params: {
			from: string;
			to: string;
			pageNumber: number;
			pageSize: number;
			fromBranch: number;
			toBranch: number;
			deliveryId: number;
			isClosed: boolean; // status
		},
		config?: Config,
	): Observable<Invoice[]>;

	abstract create(params: Invoice, config?: Config): Observable<Invoice>;

	abstract update(params: Invoice, config?: Config): Observable<Invoice>;

	abstract delete(params: { id: number }, config?: Config): Observable<void>;
}
