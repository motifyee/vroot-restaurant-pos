import { computed, inject, Injector } from '@angular/core';
import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { withLoading } from '@src/app/features/base/state/with-loading.method';
import { InvoiceTab } from './models/invoice-tab.model';
import { InvoiceListTab } from './models/invoice-list-tab.model';
import { Tab } from './models/tab.model';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { CalcInvoicePricesUseCase, invoiceIndexStore } from '@src/app/features';
import { storeType } from '../utils/utils';

type AppStoreState = {
	activeTabId: string;
	confirmCloseUnsavedTabId: string;
};

const initialState: AppStoreState = {
	activeTabId: '',
	confirmCloseUnsavedTabId: '',
};

export const appStore = signalStore(
	{ providedIn: 'root' },
	withLoading(),
	withState(initialState),
	withEntities<Tab>(),
	withComputed((store) => {
		return {
			activeTab: computed<Tab | undefined>(
				() => store.entityMap()[store.activeTabId()],
			),
		};
	}),
	withMethods((store) => {
		return {
			activateTab: (tabId: string): void => {
				// if (tabIndex < store.entities().length)
				patchState(store, { activeTabId: tabId });
			},

			closeTab: (tabId: string): void => {
				if (store.entityMap()[tabId]?.hasChanges())
					return patchState(store, {
						confirmCloseUnsavedTabId: tabId,
					});

				if (tabId === store.activeTabId()) {
					let idx = store
						.entities()
						.findIndex((tab) => tab.id === tabId);

					if (idx == 0 && store.entities().length > 1) idx = 1;
					else idx--;

					let newActiveTab = store.entities()[idx];

					patchState(store, { activeTabId: newActiveTab?.id });
				}

				patchState(store, removeEntity(tabId));
			},
			setConfirmCloseUnsavedTab: (value?: string) => {
				patchState(store, { confirmCloseUnsavedTabId: value });
			},
		};
	}),
	withMethods((store) => {
		let idxStore = inject(invoiceIndexStore),
			calcInvoiceUseCase = inject(CalcInvoicePricesUseCase),
			injector = inject(Injector);
		return {
			createInvoiceTab: (invoice?: Invoice): Tab => {
				let tab = new InvoiceTab({
					idxStore,
					calcInvoiceUseCase,
					injector,
					invoice,
				});
				patchState(store, addEntity(tab as Tab));
				patchState(store, { activeTabId: tab.id });

				return tab;
			},

			createInvoiceListTab: (): Tab => {
				let tab = new InvoiceListTab(idxStore);

				patchState(store, addEntity(tab as Tab));
				patchState(store, { activeTabId: tab.id });

				return tab;
			},
		};
	}),
);

let _i = storeType(appStore);
export type AppStore = typeof _i;
