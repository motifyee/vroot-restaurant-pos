import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { addEntity } from '@ngrx/signals/entities';
import { settingsStore } from '@webstore/state/settings';
import { featureType } from '@src/app/view/state/utils/utils';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod>(),
		},
		withMethods((store) => {
			const repo = inject(CartRepo),
				settings = inject(settingsStore);

			return {
				createInvoice: (params: {
					invoice: CreateInvoice;
					creationToken: string;
				}) => {
					store.setLoading(true);
					const invoice: CreateInvoice = {
						...params.invoice,
						branchId: settings.selectedBranch?.()?.id || 0,
					};

					return repo
						.createInvoice({
							...params,
							invoice,
						})
						.pipe(
							tap({
								next: (inv) => {
									patchState(
										store,
										addEntity(inv, invoiceEntityConfig),
									);
								},
								error: (err) => {
									console.error(err);
								},
								finalize: () => store.setLoading(false),
							}),
						);
				},
			};
		}),
	);

const _i = featureType(withCreateInvoiceMethod);
export type CreateInvoiceMethodType = typeof _i.methods;
