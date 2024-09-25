import { Customer } from '@src/app/features';
import { signalStore, withState, type } from '@ngrx/signals';

import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { withCreateCustomerMethod } from './features/with-create-customer.method';
import { withGetCustomersMethod } from './features/with-get-customers.method';
import { withSearchCustomersMethod } from './features/with-search-customers.method';
import { withTest } from './features/test';
import { withLoading as withLoadingMethod } from '../../base/state/with-loading.method';
import { withDeleteCustomerMethod } from './features/with-delete-customer.method';
import { withGetClassificationsMethod } from './features/with-get-classifications.method';
import { withGetCustomerByIdMethod } from './features/with-get-customer-by-id.method';
import { withUpdateCustomerMethod } from './features/with-update-customer.method';
import { storeType } from '@src/app/view/stores/utils/utils';

interface CustomerState {
	query: string;
}
const initialState: CustomerState = {
	query: '',
};

export const customerConfig = entityConfig({
	entity: type<Customer>(),
	collection: 'customers',
});

export const customersStoreToken = signalStore(
	withState(initialState),
	withEntities(customerConfig),
	//
	withLoadingMethod(),
	//
	withCreateCustomerMethod(),
	withDeleteCustomerMethod(),
	withGetClassificationsMethod(),
	withGetCustomerByIdMethod(),
	withGetCustomersMethod(),
	withSearchCustomersMethod(),
	withUpdateCustomerMethod(),
	//
	withTest(),
);

let _c = storeType(customersStoreToken);
export type CustomerStore = typeof _c;
