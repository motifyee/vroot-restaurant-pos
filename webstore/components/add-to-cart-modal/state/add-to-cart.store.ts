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

export type AdditionsEntityState = NamedEntityState<GetAddition, 'additions'>;

export type AdditionsEntityProps = NamedEntityProps<GetAddition, 'additions'>;

export const additionsEntityConfig = entityConfig({
	entity: type<GetAddition>(),
	collection: 'additions',
	selectId: (a: GetAddition) => a.id,
});

// #############################################################################

export type RemovedAdditionsEntityState = NamedEntityState<
	GetAddition,
	'removedAdditions'
>;

export type RemovedAdditionsEntityProps = NamedEntityProps<
	GetAddition,
	'removedAdditions'
>;

export const removedAdditionsEntityConfig = entityConfig({
	entity: type<GetAddition>(),
	collection: 'removedAdditions',
	selectId: (a: GetAddition) => a.id,
});

// #############################################################################

export type AddToCartStoreState = {
	product: InvoiceProduct;
	quantity: number;
	note: string;
};

const initialState: AddToCartStoreState = {
	product: {
		productVariantId: 0,
		title: '',
		price: 0,
		quantity: 0,
		totalPrice: 0,
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
			setProduct: (product: InvoiceProduct) => {
				patchState(store, { product });
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
			computedProduct: computed<InvoiceProduct>(() => {
				const additions: GetAddition[] = Object.values(
					store.additionsEntityMap(),
				).map((a) => ({
					...a,
					with: true,
					without: false,
					quantity: a.quantity ?? 1,
				}));

				const removedAdditions: GetAddition[] = Object.values(
					store.removedAdditionsEntityMap(),
				).map((a) => ({
					...a,
					with: false,
					without: true,
					quantity: 0,
				}));

				const product: InvoiceProduct = {
					...store.product(),
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
