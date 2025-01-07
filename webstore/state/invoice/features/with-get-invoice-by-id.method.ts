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
import { catchError,  tap } from 'rxjs';

export const withGetInvoiceByIdMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
		},
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				getInvoiceById: (params: { id: number }) =>
					repo.getInvoiceById(params).pipe(
						tap((inv) =>
							patchState(
								store,
								addEntity(inv, invoiceEntityConfig),
							),
						),
						catchError((err) => {
							console.error(err);
							throw err;
						}),
					),
			};
		}),
	);

const _i = featureType(withGetInvoiceByIdMethod);
export type GetInvoiceByIdMethodType = typeof _i.methods;
