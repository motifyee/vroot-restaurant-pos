import { computed, inject } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { GetOrderTypeIdUseCase } from '@webstore/features/settings/domain/usecases/get-order-type-id.usecase';

type State = {
	orderType: null | OrderType;
};

const initialState: State = {
	orderType: null,
};

export function withSelectOrderTypeMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withComputed((store) => {
			const getOrderTypeId = inject(GetOrderTypeIdUseCase);

			return {
				orderTypeId: computed(
					() =>
						store.orderType() &&
						getOrderTypeId.execute(store.orderType()!),
				),
			};
		}),
		withMethods((store) => {
			return {
				selectOrderType: (orderType: 'pickup' | 'delivery') => {
					patchState(store, { orderType });
				},
			};
		}),
	);
}
