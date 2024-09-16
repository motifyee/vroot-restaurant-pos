import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, InvoiceRepo } from '@features';

export class DeleteInvoiceUseCase implements UseCase<{ id: number }, void> {
	readonly invoiceRepo = inject(InvoiceRepo);

	execute(params: { id: number }): Observable<void> {
		return this.invoiceRepo.delete(params);
	}
}

export const deleteInvoiceUseCaseProvider = {
	provide: DeleteInvoiceUseCase,
	useFactory: () => new DeleteInvoiceUseCase(),
};
