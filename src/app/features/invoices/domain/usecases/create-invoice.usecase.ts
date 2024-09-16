import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@features';

export class CreateInvoiceUseCase implements UseCase<Invoice, Invoice> {
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: Invoice): Observable<Invoice> {
		return this.invoiceRepo.create(params);
	}
}

export const createInvoiceUseCaseProvider = {
	provide: CreateInvoiceUseCase,
	useFactory: () => new CreateInvoiceUseCase(),
};
