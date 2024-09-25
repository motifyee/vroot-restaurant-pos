import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	getCategoriesUseCaseProvider,
	getProductVariantsUseCaseProvider,
	// ProductsImplRepo,
	ProductsRepo,
} from '@src/app/features';
import { ProductsImplRepo } from './data';

@NgModule({
	providers: [
		getCategoriesUseCaseProvider,
		getProductVariantsUseCaseProvider,
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
