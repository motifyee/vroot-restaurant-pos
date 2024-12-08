import { importProvidersFrom, NgModule } from '@angular/core';
import { ProductsDataModule } from '@features/products';
import {
	CustomerDataModule,
	InvoiceDataModule,
	PrintersDataModule,
	UserDataModule,
	SettingsDataModule,
	ShiftDataModule,
} from '@src/app/features';

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
export class ChatFeaturesModule {}
