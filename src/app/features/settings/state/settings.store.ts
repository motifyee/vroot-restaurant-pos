import { signalStore, type, withState } from '@ngrx/signals';
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { withMapEntityToCustomerMethod } from './features/with-map-entity-to-customer.method';
import { withLoading } from '../../base/state/with-loading.method';
import { storeType } from '@src/app/view/stores/utils/utils';

export const classificationsConfig = entityConfig({
	entity: type<ClassificationDTO>(),
	collection: 'classifications',
	selectId: (c: ClassificationDTO) => c.id,
});

export const settingsStoreToken = signalStore(
	{ providedIn: 'root' },
	withState<Partial<BranchSettings>>({}),
	withEntities(classificationsConfig),
	withLoading(),
	withMapEntityToCustomerMethod(),
);

let _s = storeType(settingsStoreToken);
export type SettingsStore = typeof _s;
