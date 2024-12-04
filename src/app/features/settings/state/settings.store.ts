import { signalStore, type, withState } from '@ngrx/signals';
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { withMapEntityToCustomerMethod } from './features/with-map-entity-to-customer.method';
import { withLoading } from '../../base/state/with-loading.method';
import { storeType } from '@src/app/view/state/utils/utils';
import { withGetBranchesMethod } from './features/with-get-branches';
import { withLoadCompanyInfoMethod } from './features/with-load-company-info.methd';

export const classificationsConfig = entityConfig({
	entity: type<ClassificationDTO>(),
	collection: 'classifications',
	selectId: (c: ClassificationDTO) => c.id,
});

const intialState = {
	branches: <Branch[]>[],
};

export const settingsStore = signalStore(
	{ providedIn: 'root' },
	withState(intialState),
	withState<Partial<BranchSettings>>({}),
	withEntities(classificationsConfig),
	withLoading(),
	withGetBranchesMethod(),
	withMapEntityToCustomerMethod(),
	withLoadCompanyInfoMethod(),
);

let _s = storeType(settingsStore);
export type SettingsStore = typeof _s;
