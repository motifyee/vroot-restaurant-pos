import { importProvidersFrom, NgModule } from '@angular/core';
import { CartDataModule } from '@src/webstore/features/cart';
import { UserDataModule, SettingsDataModule } from '@webstore/features';

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
