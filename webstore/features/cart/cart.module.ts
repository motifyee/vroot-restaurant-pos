import { ModuleWithProviders, NgModule } from '@angular/core';
import { CartRepo } from '@webstore/features/cart/domain';
import { CartImplRepo } from './data';
import { GetCategoriesUseCaseProvider } from './domain';

@NgModule()
export class CartDataModule {
	static forRoot(): ModuleWithProviders<CartDataModule> {
		return {
			ngModule: CartDataModule,
			providers: [
				GetCategoriesUseCaseProvider,
				{
					provide: CartRepo,
					useClass: CartImplRepo,
				},
			],
		};
	}
}
