import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	InvoiceRepo,
	InvoiceImplRepo,
	createInvoiceUseCaseProvider,
	deleteInvoiceUseCaseProvider,
	getInvoicesUseCaseProvider,
	getInvoiceByIdUseCaseProvider,
} from '@src/app/features';
import { updateInvoiceUseCaseProvider } from './domain/usecases/update-invoice.usecase';

@NgModule({
	providers: [
		createInvoiceUseCaseProvider,
		deleteInvoiceUseCaseProvider,
		getInvoicesUseCaseProvider,
		getInvoiceByIdUseCaseProvider,
		updateInvoiceUseCaseProvider,
	],
})
export class InvoiceDataModule {
	static forRoot(): ModuleWithProviders<InvoiceDataModule> {
		return {
			ngModule: InvoiceDataModule,
			providers: [
				{
					provide: InvoiceRepo,
					useClass: InvoiceImplRepo,
				},
			],
		};
	}
}
