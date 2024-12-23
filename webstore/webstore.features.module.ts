import { importProvidersFrom, NgModule } from '@angular/core';
import {
	UserDataModule,
	SettingsDataModule,
	CartDataModule,
} from '@webstore/features';

@NgModule({
	providers: [
		importProvidersFrom(
			CartDataModule.forRoot(),
			SettingsDataModule.forRoot(),
			UserDataModule.forRoot(),
		),
	],
})
export class WebstoreFeaturesModule {}
