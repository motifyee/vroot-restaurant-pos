import { inject } from '@angular/core';
import { LoggerService } from '@core';
import { Customer, TestUseCase } from '@features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity, EntityState } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export function withTest<_>() {
	return signalStoreFeature(
		{
			state: type<EntityState<Customer>>(),
			methods: type<{
				setLoading(isLoading: boolean): void;
			}>(),
		},
		withMethods((store) => {
			let _logger = LoggerService.injectWithHeader('CustomersStore');
			let _test = inject(TestUseCase);

			return {
				test: rxMethod<void>(
					pipe(
						tap(() => store.setLoading(true)),
						switchMap((c) =>
							_test.execute().pipe(
								tapResponse({
									next: (c) => {
										patchState(store, addEntity(c));
									},
									error: console.error,
									finalize: () => {
										_logger.log(store.entityMap());
										store.setLoading(false);
									},
								}),
							),
						),
					),
				),
			};
		}),
	);
}
