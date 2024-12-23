import { importProvidersFrom, NgModule } from '@angular/core';
// import { CartDataModule } from '@webstore/features';
import {
	CustomerDataModule,
	InvoiceDataModule,
	PrintersDataModule,
	ShiftDataModule,
} from '@src/app/features';

@NgModule({
	providers: [
		importProvidersFrom(
			// CartDataModule.forRoot(),
			ShiftDataModule.forRoot(),
			CustomerDataModule.forRoot(),
			PrintersDataModule.forRoot(),
			InvoiceDataModule.forRoot(),
		),
	],
})
export class ChatFeaturesModule {}
