import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { withMenuMethods } from './with-menu.methods';
import { computed, inject } from '@angular/core';
import { GetCategoriesUseCase } from '@webstore/features';
import { tapResponse } from '@ngrx/operators';

type MenuState = {
	categories: Category[];
	menuStatus: 'idle' | 'loading' | 'loaded' | 'error';
};

const initialState: MenuState = {
	categories: [],
	menuStatus: 'idle',
};
// #############################################################################

export const menuStore = signalStore(
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

// #############################################################################

let _i = storeType(menuStore);
export type MenuStore = typeof _i;
