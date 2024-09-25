import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity, EntityState } from '@ngrx/signals/entities';
import { Invoice } from '../../../domain/models/Invoice.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { getInvoiceByIdUseCase } from '../../../domain';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export const withGetInvoiceByIdMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<EntityState<Invoice>>(),
		},
		withMethods((store) => {
			let usecase = inject(getInvoiceByIdUseCase);

			return {
				getInvoiceById: rxMethod<{
					id: number;
				}>(
					pipe(
						switchMap((id) =>
							usecase.execute(id).pipe(
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
