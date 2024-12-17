import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	GetCategoriesUseCaseProvider,
	CartRepo,
} from '@src/webstore/features/cart';
import { CartImplRepo } from './data';

@NgModule({
	providers: [GetCategoriesUseCaseProvider],
})
export class CartDataModule {
	static forRoot(): ModuleWithProviders<CartDataModule> {
		return {
			ngModule: CartDataModule,
			providers: [
				{
					provide: CartRepo,
					useClass: CartImplRepo,
				},
			],
		};
	}
}
