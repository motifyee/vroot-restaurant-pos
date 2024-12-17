import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { EntityState, removeEntity } from '@ngrx/signals/entities';
import { Invoice } from '../../../domain/models/Invoice.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { InvoiceRepo } from '../../../domain';

export const withDeleteInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<EntityState<Invoice>>() },
		withMethods((state) => {
			let repo = inject(InvoiceRepo);

			return {
				deleteInvoice: rxMethod<Invoice>(
					pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.delete(inv).pipe(
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
