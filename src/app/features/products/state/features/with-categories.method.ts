import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { GetCategoriesUseCase } from '@src/app/features';

type State = {
	categories: Category[];
	categoriesStatus: 'loading' | 'loaded' | 'error';
};

const initialState: State = {
	categories: [],
	categoriesStatus: 'loading',
};

export const withCategoriesMethod = <_>() =>
	signalStoreFeature(
		withState(initialState),
		withComputed((store) => {
			return {
				menu: computed(() =>
					store.categories().map((c) => ({
						...c,
						variants: c.products.flatMap((p) => p.variants),
					})),
				),
			};
		}),
		withMethods((store) => {
			return {
				clearCategories: () => patchState(store, { categories: [] }),
				setCategories: (categories: Category[]) =>
					patchState(store, { categories }),
			};
		}),
		withMethods((store) => {
			let usecase = inject(GetCategoriesUseCase);

			return {
				getCategories: (branchId: number) => {
					patchState(store, { categoriesStatus: 'loading' });

					return usecase.execute({ branchId }).pipe(
						tapResponse({
							next: (categories) => {
								patchState(store, {
									categories,
									categoriesStatus: 'loaded',
								});
							},
							error: (err) => {
								console.error(err);
								patchState(store, {
									categoriesStatus: 'error',
								});
							},
						}),
					);
				},
			};
		}),
	);
