import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	InvoiceRepo,
	InvoiceImplRepo,
	createInvoiceUseCaseProvider,
	deleteInvoiceUseCaseProvider,
	getInvoicesUseCaseProvider,
	getInvoiceByIdUseCaseProvider,
} from '@features';
import { updateInvoiceUseCaseProvider } from './usecases/update-invoice.usecase';

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
