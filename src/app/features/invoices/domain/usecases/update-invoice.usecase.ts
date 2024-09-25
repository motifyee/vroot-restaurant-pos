import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@src/app/features';
import { Invoice } from '../models/Invoice.model';

export class UpdateInvoiceUseCase
	implements UseCase<Invoice, Invoice>
{
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: Invoice): Observable<Invoice> {
		return this.invoiceRepo.update(params);
	}
}

export const updateInvoiceUseCaseProvider = {
	provide: UpdateInvoiceUseCase,
	useFactory: () => new UpdateInvoiceUseCase(),
};
