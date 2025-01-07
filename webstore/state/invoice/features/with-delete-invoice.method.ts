import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { tap, finalize } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export const withDeleteInvoiceMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod>(),
		},
		withMethods((state) => {
			const repo = inject(CartRepo);

			return {
				deleteInvoice: (params: { id: number }) => {
					state.setLoading(true);
					return repo.deleteInvoice(params).pipe(
						tap({
							next: () => {
								patchState(
									state,
									removeEntity(
										params.id,
										invoiceEntityConfig,
									),
								);
							},
							error: (err) => {
								console.error(err);
							},
							finalize: () => state.setLoading(false),
						}),
					);
				},
			};
		}),
	);

const _i = featureType(withDeleteInvoiceMethod);
export type WithDeleteInvoiceMethodType = typeof _i.methods;
