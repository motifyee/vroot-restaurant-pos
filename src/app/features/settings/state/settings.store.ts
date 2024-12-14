import { signalStore, type, withState } from '@ngrx/signals';
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { withMapEntityToCustomerMethod } from './features/with-map-entity-to-customer.method';
import { withLoading } from '../../base/state/with-loading.method';
import { storeType } from '@src/app/view/state/utils/utils';
import { withGetBranchesMethod } from './features/with-get-branches';
import { withGetCompanyInfoMethod } from './features/with-get-company-info.method';
import { withSelectOrderTypeMethod } from './features/with-select-order-type.method';

export const classificationsConfig = entityConfig({
	entity: type<ClassificationDTO>(),
	collection: 'classifications',
	selectId: (c: ClassificationDTO) => c.id,
});

const intialState = {
	branches: <Branch[]>[],
};

export const settingsStore = signalStore(
	withState(intialState),
	withState<Partial<BranchSettings>>({}),
	withEntities(classificationsConfig),
	withLoading(),
	withGetBranchesMethod(),
	withMapEntityToCustomerMethod(),
	withGetCompanyInfoMethod(),
	withSelectOrderTypeMethod(),
);

let _s = storeType(settingsStore);
export type SettingsStore = typeof _s;
