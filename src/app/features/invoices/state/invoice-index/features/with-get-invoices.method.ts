import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntities, EntityState } from '@ngrx/signals/entities';
import { Invoice } from '../../../domain/models/Invoice.model';
import { getInvoicesUseCase } from '../../../domain';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { InvoiceStoreState } from '../invoice-index.store';
import { tapResponse } from '@ngrx/operators';

export function withGetInvoicesMethod<_>() {
	return signalStoreFeature(
		{ state: type<EntityState<Invoice> & InvoiceStoreState>() },
		withMethods((store) => {
			let usecase = inject(getInvoicesUseCase);

			return {
				getInvoices: rxMethod(
					pipe(
						distinctUntilChanged(),
						switchMap(() =>
							usecase.execute(store.filters()).pipe(
								tapResponse({
									next: (invs) =>
										patchState(store, addEntities(invs)),
									error: console.error,
								}),
							),
						),
					),
				),
			};
		}),
	);
}
