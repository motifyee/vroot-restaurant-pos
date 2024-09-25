import { computed, inject } from '@angular/core';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { invoiceIndexStoreToken } from '@src/app/features';

type AppStoreState = {
	activeTabId: string;
};

const initialState: AppStoreState = {
	activeTabId: '',
};

export const appStoreToken = signalStore(
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
		let confirmationService = inject(ConfirmationService),
			messageService = inject(MessageService),
			idxStore = inject(invoiceIndexStoreToken);

		return {
			activateTab: (tabId: string): void => {
				// if (tabIndex < store.entities().length)
				patchState(store, { activeTabId: tabId });
			},

			closeTab: (tabId: string, target?: EventTarget): void => {
				const close = () => {
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
				};

				if (!store.entityMap()[tabId]?.hasChanges()) close();

				// save or discard changes before closing
				confirmationService.confirm({
					target: target,
					message:
						'Your current tab has unsaved changes. Are you sure you want to close it?',
					accept: () => {
						store
							.activeTab()!
							.save()
							.subscribe(() => {
								close();

								messageService.add({
									severity: 'success',
									summary: 'Saved',
									detail: 'Your changes have been saved',
									life: 3000,
								});
							});
					},
					reject: () => {
						store.activeTab()!.discard();
						close();

						messageService.add({
							severity: 'error',
							summary: 'Discarded',
							detail: 'Your changes have been discarded',
							life: 3000,
						});
					},
				});
			},

			createInvoiceTab: (inovice?: Invoice): Tab => {
				let tab = new InvoiceTab(idxStore, inovice);

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
