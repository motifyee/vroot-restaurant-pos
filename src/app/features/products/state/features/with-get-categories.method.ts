import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { GetCategoriesUseCase } from '../../domain';

export const withGetCategoriesMethod = <_>() =>
	signalStoreFeature(
		withMethods((store) => {
			let usecase = inject(GetCategoriesUseCase);

			return {
				getCategories: () =>
					usecase.execute().pipe(
						tapResponse({
							next: (categories) =>
								patchState(store, { categories }),
							error: console.error,
						}),
					),
			};
		}),
	);
