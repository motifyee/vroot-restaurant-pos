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
import { catchError } from 'rxjs';
import { tap } from 'rxjs';

export const withDeleteInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((state) => {
			const repo = inject(CartRepo);

			return {
				deleteInvoice: (params: { id: number }) => {
					return repo.deleteInvoice(params).pipe(
						tap(() => {
							patchState(
								state,
								removeEntity(params.id, invoiceEntityConfig),
							);
						}),
						catchError((err) => {
							console.error(err);
							throw err;
						}),
					);
				},
			};
		}),
	);

const _i = featureType(withDeleteInvoiceMethod);
export type WithDeleteInvoiceMethodType = typeof _i.methods;
