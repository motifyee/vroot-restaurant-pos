import { ModuleWithProviders, NgModule } from '@angular/core';
import {
	createAddressUseCaseProvider,
	createCustomerUseCaseProvider,
	CustomerImplRepo,
	CustomerRepo,
	deleteAddressUseCaseProvider,
	deleteCustomerUseCaseProviderProvider,
	getAddressesUseCaseProvider,
	getClasificationsUseCaseProvider,
	getCustomersUseCaseProvider,
	getCustomerUseCaseProvider,
	searchCustomersUseCaseProvider,
	updateAddressUseCaseProvider,
	updateCustomerUseCaseProvider,
	testUseCaseProvider,
	AddressRepo,
	AddressImplRepo,
} from '@features';

@NgModule({
	providers: [
		testUseCaseProvider,
		createCustomerUseCaseProvider,
		deleteCustomerUseCaseProviderProvider,
		getClasificationsUseCaseProvider,
		getCustomerUseCaseProvider,
		getCustomersUseCaseProvider,
		searchCustomersUseCaseProvider,
		updateCustomerUseCaseProvider,

		createAddressUseCaseProvider,
		deleteAddressUseCaseProvider,
		getAddressesUseCaseProvider,
		updateAddressUseCaseProvider,
	],
})
export class CustomerDataModule {
	static forRoot(): ModuleWithProviders<CustomerDataModule> {
		return {
			ngModule: CustomerDataModule,
			providers: [
				{
					provide: CustomerRepo,
					useClass: CustomerImplRepo,
				},
				{
					provide: AddressRepo,
					useClass: AddressImplRepo,
				},
			],
		};
	}
}
