import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { EntityState, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { CartRepo } from '@webstore/features/cart/domain';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';

export const withDeleteInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<EntityState<Invoice>>() },
		withMethods((state) => {
			let repo = inject(CartRepo);

			return {
				deleteInvoice: rxMethod<Invoice>(
					pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.deleteInvoice(inv).pipe(
								tapResponse({
									next: (inv) =>
										patchState(state, removeEntity(inv.id)),
									error: console.error,
								}),
							),
						),
					),
				),
			};
		}),
	);
