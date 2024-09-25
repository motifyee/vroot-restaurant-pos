import { inject } from '@angular/core';
import { Customer, customerConfig, TestUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import {
	addEntity,
	EntityState,
	NamedEntityState,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { LoggerService } from '@src/app/core';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withTest<_>() {
	return signalStoreFeature(
		{
			state: type<NamedEntityState<Customer, 'customers'>>(),
			methods: type<LoadingMethod>(),
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
										patchState(
											store,
											addEntity(c, customerConfig),
										);
									},
									error: console.error,
									finalize: () => {
										_logger.log(store.customersEntityMap());
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
