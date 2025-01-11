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
import { ActiveInvoiceFeatureMethodsType } from './with-active-invoice.method';
import { userStore } from '@webstore/state/user';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod & ActiveInvoiceFeatureMethodsType>(),
		},
		withMethods((store) => {
			const repo = inject(CartRepo),
				settings = inject(settingsStore),
				user = inject(userStore);

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
										addEntity(
											{
												...inv,
												branchId: (<any>inv).toBranchId,
											},
											invoiceEntityConfig,
										),
									);

									if (!user.isLoggedIn())
										store.setAnonymousInvoiceId(inv.id);
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
