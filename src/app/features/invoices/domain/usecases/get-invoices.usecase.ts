import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@src/app/features';
import { Invoice, SalesInvoiceType } from '../models/Invoice.model';

export type InvoiceIndexFilter = {
	pageNumber: number;
	pageSize: number;

	from: string;
	to: string;

	isClosed?: boolean;
	salesInvoiceType?: SalesInvoiceType;
	deliveryMan?: BuddyDTO;
	callCenter?: boolean;
	branchId?: number;
	fromBranch?: number;
	toBranch?: number;
};
export class getInvoicesUseCase
	implements UseCase<InvoiceIndexFilter, Invoice[]>
{
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: InvoiceIndexFilter): Observable<Invoice[]> {
		return this.invoiceRepo.getInvoices(params);
	}
}

export const getInvoicesUseCaseProvider = {
	provide: getInvoicesUseCase,
	useFactory: () => new getInvoicesUseCase(),
};
