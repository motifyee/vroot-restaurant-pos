import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	getPosDevicesUseCaseProvider,
	getPrintersUseCaseProvider,
	printersMapUseCaseProvider,
	PrintersImplRepo,
	PrintersRepo,
} from '@src/app/features';

@NgModule({
	providers: [
		getPosDevicesUseCaseProvider,
		getPrintersUseCaseProvider,
		printersMapUseCaseProvider,
	],
})
export class PrintersDataModule {
	static forRoot(): ModuleWithProviders<PrintersDataModule> {
		return {
			ngModule: PrintersDataModule,
			providers: [
				{
					provide: PrintersRepo,
					useClass: PrintersImplRepo,
				},
			],
		};
	}
}
