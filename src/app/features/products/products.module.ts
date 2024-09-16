import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	getCategoriesUseCaseProvider,
	getProductVariantsUseCaseProvider,
	ProductsImplRepo,
	ProductsRepo,
} from '@features';

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
