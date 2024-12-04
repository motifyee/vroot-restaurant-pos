import { importProvidersFrom, NgModule } from '@angular/core';
import { SettingsDataModule } from './settings';
import { ShiftDataModule } from './shifts';
import { CustomerDataModule } from './customers';
import { PrintersDataModule } from './printers';
import { InvoiceDataModule } from './invoices';
import { UserDataModule } from './user';
import { ProductsDataModule } from '@features/products';

@NgModule({
	providers: [
		importProvidersFrom(
			ProductsDataModule.forRoot(),
			SettingsDataModule.forRoot(),
			ShiftDataModule.forRoot(),
			CustomerDataModule.forRoot(),
			PrintersDataModule.forRoot(),
			InvoiceDataModule.forRoot(),
			UserDataModule.forRoot(),
		),
	],
})
export class WebstoreFeaturesModule {}
