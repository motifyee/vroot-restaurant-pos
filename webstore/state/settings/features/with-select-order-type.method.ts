import { computed, inject } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';
import { GetOrderTypeIdUseCase } from '@webstore/features/settings/domain/usecases/get-order-type-id.usecase';

type State = {
	defaultOrderType: null | InvoiceType;
};

const initialState: State = {
	defaultOrderType: null,
};

export function withSelectOrderTypeMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withComputed((store) => {
			const getOrderTypeId = inject(GetOrderTypeIdUseCase);

			return {
				orderTypeId: computed(
					() =>
						store.defaultOrderType() &&
						InvoiceType[store.defaultOrderType()!],
				),
			};
		}),
		withMethods((store) => {
			return {
				selectDefaultOrderType: (orderType: InvoiceType) => {
					patchState(store, { defaultOrderType: orderType });
				},
			};
		}),
	);
}
