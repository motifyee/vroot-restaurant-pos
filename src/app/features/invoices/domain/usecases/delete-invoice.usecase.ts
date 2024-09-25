import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@src/app/features';
import { Invoice } from '../models/Invoice.model';

export class DeleteInvoiceUseCase implements UseCase<Invoice, Invoice> {
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: Invoice): Observable<Invoice> {
		return this.invoiceRepo.delete(params);
	}
}

export const deleteInvoiceUseCaseProvider = {
	provide: DeleteInvoiceUseCase,
	useFactory: () => new DeleteInvoiceUseCase(),
};
