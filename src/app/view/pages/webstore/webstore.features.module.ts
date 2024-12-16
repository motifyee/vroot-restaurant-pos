import { importProvidersFrom, NgModule } from '@angular/core';
import { ProductsDataModule } from '@features/products';
import {
	InvoiceDataModule,
	UserDataModule,
	SettingsDataModule,
	CustomerDataModule,
} from '@src/app/features';

@NgModule({
	providers: [
		importProvidersFrom(
			ProductsDataModule.forRoot(),
			SettingsDataModule.forRoot(),
			InvoiceDataModule.forRoot(),
			UserDataModule.forRoot(),
			CustomerDataModule.forRoot(),
		),
	],
})
export class WebstoreFeaturesModule {}
