import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	CloseShiftUseCaseProvider,
	GetShiftUseCaseProvider,
	OpenShiftUseCaseProvider,
	ShiftRepo,
} from './domain';
import { ShiftImplRepo } from './data';

@NgModule({
	providers: [
		CloseShiftUseCaseProvider,
		GetShiftUseCaseProvider,
		OpenShiftUseCaseProvider,
	],
})
export class ShiftDataModule {
	static forRoot(): ModuleWithProviders<ShiftDataModule> {
		return {
			ngModule: ShiftDataModule,
			providers: [
				{
					provide: ShiftRepo,
					useClass: ShiftImplRepo,
				},
			],
		};
	}
}
