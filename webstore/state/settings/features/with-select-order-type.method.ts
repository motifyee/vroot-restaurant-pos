import { computed, inject } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';

type State = {
	defaultInvoiceType: null | InvoiceType;
};

const initialState: State = {
	defaultInvoiceType: null,
};

export function withSelectOrderTypeMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withComputed((store) => {
			return {
				orderTypeId: computed(
					() =>
						store.defaultInvoiceType() &&
						InvoiceType[store.defaultInvoiceType()!],
				),
			};
		}),
		withMethods((store) => {
			return {
				selectDefaultInvoiceType: (invoiceType: InvoiceType) => {
					patchState(store, { defaultInvoiceType: invoiceType });
				},
			};
		}),
	);
}
