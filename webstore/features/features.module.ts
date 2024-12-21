import { importProvidersFrom, NgModule } from '@angular/core';
import { CartDataModule } from './cart';
import { SettingsDataModule } from './settings';
import { UserDataModule } from './user';

@NgModule({
	providers: [
		importProvidersFrom(
			CartDataModule.forRoot(),
			SettingsDataModule.forRoot(),
			UserDataModule.forRoot(),
		),
	],
})
export class FeaturesModule {}
