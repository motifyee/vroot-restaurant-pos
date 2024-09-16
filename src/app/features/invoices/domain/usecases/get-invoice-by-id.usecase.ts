import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@features';

export class getInvoiceByIdUseCase implements UseCase<{ id: number }, Invoice> {
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: { id: number }): Observable<Invoice> {
		return this.invoiceRepo.getById(params);
	}
}

export const getInvoiceByIdUseCaseProvider = {
	provide: getInvoiceByIdUseCase,
	useFactory: () => new getInvoiceByIdUseCase(),
};
