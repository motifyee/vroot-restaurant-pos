import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { GetCategoriesUseCase } from '@webstore/features';

type State = {
	categories: Category[];
	menuStatus: 'loading' | 'loaded' | 'error';
};

const initialState: State = {
	categories: [],
	menuStatus: 'loading',
};

export const withMenuMethods = <_>() =>
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
				clearMenu: () => patchState(store, { categories: [] }),
				setMenu: (categories: Category[]) =>
					patchState(store, { categories }),
			};
		}),
		withMethods((store) => {
			let usecase = inject(GetCategoriesUseCase);

			return {
				getMenu: (branchId: number) => {
					patchState(store, { menuStatus: 'loading' });

					return usecase.execute({ branchId }).pipe(
						tapResponse({
							next: (categories) => {
								patchState(store, {
									categories,
									menuStatus: 'loaded',
								});
							},
							error: (err) => {
								console.error(err);
								patchState(store, {
									menuStatus: 'error',
								});
							},
						}),
					);
				},
			};
		}),
	);
