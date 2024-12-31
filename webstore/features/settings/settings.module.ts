import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	GetBranchesUseCaseProvider,
	GetBranchSettingsUseCaseProvider,
	GetCompanyInfoUseCaseProvider,
	SettingsRepo,
} from '@webstore/features';
import { SettingsImplRepo } from './data';
import { GetCompanyDomainUseCaseProvider } from './domain/usecases/get-company-domain.usecase';
import { GetOrderTypeNameUseCaseProvider } from './domain/usecases/get-order-type-name.usecase';
import { GetOrderTypeIdUseCaseProvider } from './domain/usecases/get-order-type-id.usecase';

@NgModule()
export class SettingsDataModule {
	static forRoot(): ModuleWithProviders<SettingsDataModule> {
		return {
			ngModule: SettingsDataModule,
			providers: [
				GetBranchSettingsUseCaseProvider,
				GetCompanyInfoUseCaseProvider,
				GetCompanyDomainUseCaseProvider,

				GetOrderTypeNameUseCaseProvider,
				GetOrderTypeIdUseCaseProvider,

				GetBranchesUseCaseProvider,
				{
					provide: SettingsRepo,
					useClass: SettingsImplRepo,
				},
			],
		};
	}
}
