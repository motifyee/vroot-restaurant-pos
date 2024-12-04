import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	GetBranchesUseCaseProvider,
	GetBranchSettingsUseCaseProvider,
	GetCompanyInfoUseCaseProvider,
	SettingsRepo,
} from '@src/app/features';
import { SettingsImplRepo } from './data';

@NgModule({
	providers: [
		GetBranchSettingsUseCaseProvider,
		GetCompanyInfoUseCaseProvider,
		GetBranchesUseCaseProvider,
	],
})
export class SettingsDataModule {
	static forRoot(): ModuleWithProviders<SettingsDataModule> {
		return {
			ngModule: SettingsDataModule,
			providers: [
				{
					provide: SettingsRepo,
					useClass: SettingsImplRepo,
				},
			],
		};
	}
}
