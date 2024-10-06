import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { Invoice } from '../../domain/models/Invoice.model';
import { storeType } from '@src/app/view/state/utils/utils';
import { InvoiceProduct } from '../../domain/models/invoice-product.model';
import {
	addEntity,
	EntityId,
	removeEntity,
	updateEntity,
	withEntities,
} from '@ngrx/signals/entities';
import { computed } from '@angular/core';

type InvoiceStoreState = {
	_invoice: Invoice;
};

const initialState: InvoiceStoreState = {
	_invoice: {} as Invoice,
};

export const invoiceStore = signalStore(
	withState(initialState),
	withEntities<InvoiceProduct>(),
	withComputed((store) => ({
		invoice: computed(() => ({
			...store._invoice,
			products: store.entities,
		})),
	})),

	withMethods((store) => {
		return {
			addProduct: (variant: ProductVariant, quantity = 1) => {
				let variantExists = !!store.entityMap()[variant.id];

				let _quantity = variantExists
					? store.entityMap()[variant.id].quantity + quantity
					: quantity;

				let newProduct: InvoiceProduct = {
					id: variant.id,
					productVariant: variant,
					quantity: _quantity,
					price: variant.price,
					totalPrice: variant.price * _quantity,
				};

				if (variantExists)
					patchState(
						store,
						updateEntity({ id: variant.id, changes: newProduct }),
					);
				else patchState(store, addEntity(newProduct));
			},
			removeProduct: (id: EntityId) => {
				patchState(store, removeEntity(id));
			},
			updateProduct: (product: InvoiceProduct) => {
				patchState(
					store,
					updateEntity({ id: product.id, changes: product }),
				);
			},
		};
	}),
);

const _i = storeType(invoiceStore);
export type InvoiceStore = typeof _i;
