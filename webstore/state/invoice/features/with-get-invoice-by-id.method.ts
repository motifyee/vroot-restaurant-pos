import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { tap, finalize } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export const withGetInvoiceByIdMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod>(),
		},
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				getInvoiceById: (params: { id: number }) => {
					store.setLoading(true);

					return repo.getInvoiceById(params).pipe(
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

const _i = featureType(withGetInvoiceByIdMethod);
export type GetInvoiceByIdMethodType = typeof _i.methods;
