import { importProvidersFrom, NgModule } from '@angular/core';
import {
	CustomerDataModule,
	InvoiceDataModule,
	PrintersDataModule,
	ProductsDataModule,
	SettingsDataModule,
	ShiftDataModule,
} from '@features';

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
