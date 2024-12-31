import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	CalcCartProductPriceUseCaseProvider,
	CalcCartTotalPriceUseCaseProvider,
	CalcInvoiceProductPriceUseCaseProvider,
	CartProductToInvoiceProductUseCaseProvider,
	CartRepo,
	InvoiceProductToCartProductUseCaseProvider,
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

				CalcCartProductPriceUseCaseProvider,
				CalcCartTotalPriceUseCaseProvider,
				CalcInvoiceProductPriceUseCaseProvider,

				CartProductToInvoiceProductUseCaseProvider,
				InvoiceProductToCartProductUseCaseProvider,
				{
					provide: CartRepo,
					useClass: CartImplRepo,
				},
			],
		};
	}
}
