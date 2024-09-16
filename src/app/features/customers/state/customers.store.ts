import { Customer, Classification } from '@features';
import { signalStore, withState } from '@ngrx/signals';

import { withEntities } from '@ngrx/signals/entities';
import { withCreateCustomerMethod } from './features/with-create-customer.method';
import { withGetCustomersMethod } from './features/with-get-customers.method';
import { withSearchCustomersMethod } from './features/with-search-customers.method';
import { withTest } from './features/test';
import { withLoading as withLoadingMethod } from './features/with-loading.method';
import { withDeleteCustomerMethod } from './features/with-delete-customer.method';
import { withGetClassificationsMethod } from './features/with-get-classifications.method';
import { withGetCustomerByIdMethod } from './features/with-get-customer-by-id.method';
import { withUpdateCustomerMethod } from './features/with-update-customer.method';

interface CustomerState {
	classifications: Classification[];
	query: string;
}
const initialState: CustomerState = {
	classifications: [],
	query: '',
};

export const customersStore = signalStore(
	// { providedIn: 'root' },
	withEntities<Customer>(),
	withState(initialState),
	withLoadingMethod(),
	withCreateCustomerMethod(),
	withDeleteCustomerMethod(),
	withGetClassificationsMethod(),
	withGetCustomerByIdMethod(),
	withGetCustomersMethod(),
	withSearchCustomersMethod(),
	withUpdateCustomerMethod(),
	withTest(),
);
