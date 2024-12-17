import { importProvidersFrom, NgModule } from '@angular/core';
import { ShiftDataModule } from './shifts';
import { CustomerDataModule } from './customers';
import { PrintersDataModule } from './printers';
import { InvoiceDataModule } from './invoices';

@NgModule({
	providers: [
		importProvidersFrom(
			ShiftDataModule.forRoot(),
			CustomerDataModule.forRoot(),
			PrintersDataModule.forRoot(),
			InvoiceDataModule.forRoot(),
		),
	],
})
export class FeaturesModule {}
