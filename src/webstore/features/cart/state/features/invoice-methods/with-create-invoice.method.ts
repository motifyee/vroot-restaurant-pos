import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { Invoice } from '../../../domain/models/Invoice.model';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { InvoiceRepo } from '../../../domain';
import { addEntity, EntityState } from '@ngrx/signals/entities';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<EntityState<Invoice>>() },
		withMethods((store) => {
			let repo = inject(InvoiceRepo);

			return {
				createInvoice: (params: {
					invoice: Invoice;
					creationToken: string;
				}) =>
					of(params).pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.create(inv).pipe(
								tapResponse({
									next: (inv) =>
										patchState(store, addEntity(inv)),
									error: console.error,
								}),
							),
						),
					),
			};
		}),
	);
