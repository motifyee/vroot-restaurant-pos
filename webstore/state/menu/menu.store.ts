import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { computed, inject } from '@angular/core';
import { GetCategoriesUseCase } from '@webstore/features';
import { tapResponse } from '@ngrx/operators';
import { IS_DEVMODE } from '@src/app/core';
import { of } from 'rxjs';

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
			menu: computed(() => store.categories()),
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
			getMenu: (branchId?: number) => {
				if (IS_DEVMODE) {
					const products: Category[] = JSON.parse(
						localStorage.getItem('products') ?? 'null',
					);

					if (products) {
						store.setMenu(products);
						return of(products);
					}
				}

				if (typeof branchId !== 'number') return of([]);

				patchState(store, { menuStatus: 'loading' });

				return usecase.execute({ branchId }).pipe(
					tapResponse({
						next: (categories) => {
							patchState(store, {
								categories,
								menuStatus: 'loaded',
							});

							IS_DEVMODE &&
								localStorage.setItem(
									'products',
									JSON.stringify(categories),
								);
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
