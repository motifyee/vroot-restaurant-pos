import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@src/app/features';
import { Invoice } from '../models/Invoice.model';

export class CreateInvoiceUseCase
	implements UseCase<{ invoice: Invoice; creationToken: string }, Invoice>
{
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: {
		invoice: Invoice;
		creationToken: string;
	}): Observable<Invoice> {
		return this.invoiceRepo.create(params);
	}
}

export const createInvoiceUseCaseProvider = {
	provide: CreateInvoiceUseCase,
	useFactory: () => new CreateInvoiceUseCase(),
};
