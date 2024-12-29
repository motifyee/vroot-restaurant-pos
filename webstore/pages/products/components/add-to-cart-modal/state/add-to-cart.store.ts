import {
	patchState,
	signalStore,
	type,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import {
	entityConfig,
	NamedEntityProps,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import { CalcCartProductPriceUseCase } from '@webstore/features';
import { withQtyMethods } from './features/qty.methods';
import { withAdditionMethods } from './features/addition.methods';

export type AdditionsEntityState = NamedEntityState<Addition, 'additions'>;

export type AdditionsEntityProps = NamedEntityProps<Addition, 'additions'>;

export const additionsEntityConfig = entityConfig({
	entity: type<Addition>(),
	collection: 'additions',
	selectId: (a: Addition) => a.id,
});

// #############################################################################

export type RemovedAdditionsEntityState = NamedEntityState<
	Addition,
	'removedAdditions'
>;

export type RemovedAdditionsEntityProps = NamedEntityProps<
	Addition,
	'removedAdditions'
>;

export const removedAdditionsEntityConfig = entityConfig({
	entity: type<Addition>(),
	collection: 'removedAdditions',
	selectId: (a: Addition) => a.id,
});

// #############################################################################

export type AddToCartStoreState = {
	productVariant: ProductVariant;
	quantity: number;
	note: string;
};

const initialState: AddToCartStoreState = {
	productVariant: {
		id: 0,
		title: '',
		price: 0,
		additions: [],
	},
	quantity: 1,
	note: '',
};

// #############################################################################

export const addToCartStore = signalStore(
	withState(initialState),
	withEntities(additionsEntityConfig),
	withEntities(removedAdditionsEntityConfig),
	withMethods((store) => {
		return {
			setVariant: (productVariant: ProductVariant) => {
				patchState(store, { productVariant });
			},
			setNote: (note: string) => {
				patchState(store, { note });
			},
		};
	}),
	withQtyMethods(),
	withAdditionMethods(),
	withComputed((store) => {
		const calcProductPrice = inject(CalcCartProductPriceUseCase);

		return {
			cartProduct: computed<CartVariant>(() => {
				const additions: Addition[] = Object.values(
					store.additionsEntityMap(),
				).map((a) => ({
					...a,
					with: true,
					without: false,
					quantity: a.quantity ?? 1,
				}));

				const removedAdditions: Addition[] = Object.values(
					store.removedAdditionsEntityMap(),
				).map((a) => ({
					...a,
					with: false,
					without: true,
					quantity: 0,
				}));

				const product: CartVariant = {
					variant: store.productVariant(),
					quantity: store.quantity(),
					additions: [...additions, ...removedAdditions],
				};

				if (store.note()) product.note! = store.note();
				product.totalPrice = calcProductPrice.execute({ product });

				return product;
			}),
		};
	}),
);

// #############################################################################

let _i = storeType(addToCartStore);
export type CartStore = typeof _i;
