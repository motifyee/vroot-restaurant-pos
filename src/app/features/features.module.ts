import { importProvidersFrom, NgModule } from '@angular/core';
import { ProductsDataModule } from './products';
import { SettingsDataModule } from './settings';
import { ShiftDataModule } from './shifts';
import { CustomerDataModule } from './customers';
import { PrintersDataModule } from './printers';
import { InvoiceDataModule } from './invoices';

@NgModule({
	providers: [
		importProvidersFrom(
			CustomerDataModule.forRoot(),
			PrintersDataModule.forRoot(),
			ProductsDataModule.forRoot(),
			InvoiceDataModule.forRoot(),
			SettingsDataModule.forRoot(),
			ShiftDataModule.forRoot(),
		),
	],
})
export class FeaturesModule {}
