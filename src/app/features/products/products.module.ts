import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	GetCategoriesUseCaseProvider,
	GetProductVariantsUseCaseProvider,
	ProductsRepo,
} from '@features/products';
import { ProductsImplRepo } from './data';

@NgModule({
	providers: [
		GetCategoriesUseCaseProvider,
		GetProductVariantsUseCaseProvider,
	],
})
export class ProductsDataModule {
	static forRoot(): ModuleWithProviders<ProductsDataModule> {
		return {
			ngModule: ProductsDataModule,
			providers: [
				{
					provide: ProductsRepo,
					useClass: ProductsImplRepo,
				},
			],
		};
	}
}
