import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@features';

type Filters = {
	from: string;
	to: string;
	pageNumber: number;
	pageSize: number;
	fromBranch: number;
	toBranch: number;
	deliveryId: number;
	isClosed: boolean; // status
};
export class getInvoicesUseCase implements UseCase<Filters, Invoice[]> {
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: Filters): Observable<Invoice[]> {
		return this.invoiceRepo.getInvoices(params);
	}
}

export const getInvoicesUseCaseProvider = {
	provide: getInvoicesUseCase,
	useFactory: () => new getInvoicesUseCase(),
};
