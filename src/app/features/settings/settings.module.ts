import { ModuleWithProviders, NgModule } from '@angular/core';
import { SettingsImplRepo, SettingsRepo } from '@features';
import { GetBranchSettingsUseCaseProvider } from './domain/usecases/get-branch-settings.usecase';

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
