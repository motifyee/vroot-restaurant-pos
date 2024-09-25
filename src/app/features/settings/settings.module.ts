import { ModuleWithProviders, NgModule } from '@angular/core';
import { SettingsRepo } from '@src/app/features';
import { GetBranchSettingsUseCaseProvider } from './domain/usecases/get-branch-settings.usecase';
import { SettingsImplRepo } from './data';

@NgModule({
	providers: [GetBranchSettingsUseCaseProvider],
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
