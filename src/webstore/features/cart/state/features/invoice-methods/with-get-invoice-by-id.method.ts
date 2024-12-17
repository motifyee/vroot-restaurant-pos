import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity, EntityState } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
import { CartRepo } from '@webstore/features/cart/domain';

export const withGetInvoiceByIdMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<EntityState<Invoice>>(),
		},
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				getInvoiceById: rxMethod<{
					id: number;
				}>(
					pipe(
						switchMap((params) =>
							repo.getInvoiceById(params).pipe(
								tapResponse({
									next: (inv) =>
										patchState(store, addEntity(inv)),
									error: console.error,
								}),
							),
						),
					),
				),
			};
		}),
	);
