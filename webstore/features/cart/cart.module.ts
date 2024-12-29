import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	CalcCartProductPriceUseCase,
	CalcCartTotalPriceUseCase,
	CartRepo,
} from '@webstore/features/cart/domain';
import { CartImplRepo } from './data';
import { GetCategoriesUseCaseProvider } from './domain';

@NgModule()
export class CartDataModule {
	static forRoot(): ModuleWithProviders<CartDataModule> {
		return {
			ngModule: CartDataModule,
			providers: [
				GetCategoriesUseCaseProvider,
				CalcCartProductPriceUseCase,
				CalcCartTotalPriceUseCase,
				{
					provide: CartRepo,
					useClass: CartImplRepo,
				},
			],
		};
	}
}
