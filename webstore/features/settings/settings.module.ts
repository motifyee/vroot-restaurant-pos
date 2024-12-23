import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	GetBranchesUseCaseProvider,
	GetBranchSettingsUseCaseProvider,
	GetCompanyInfoUseCaseProvider,
	SettingsRepo,
} from '@webstore/features';
import { SettingsImplRepo } from './data';

@NgModule()
export class SettingsDataModule {
	static forRoot(): ModuleWithProviders<SettingsDataModule> {
		return {
			ngModule: SettingsDataModule,
			providers: [
				GetBranchSettingsUseCaseProvider,
				GetCompanyInfoUseCaseProvider,
				GetBranchesUseCaseProvider,
				{
					provide: SettingsRepo,
					useClass: SettingsImplRepo,
				},
			],
		};
	}
}
