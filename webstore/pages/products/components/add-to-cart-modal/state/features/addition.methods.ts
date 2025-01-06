import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import {
	additionsEntityConfig,
	AdditionsEntityState,
	AddToCartStoreState,
	removedAdditionsEntityConfig,
	RemovedAdditionsEntityState,
} from '../add-to-cart.store';
import {
	addEntity,
	EntityId,
	removeEntity,
	updateEntity,
} from '@ngrx/signals/entities';

export const withAdditionMethods = <_>() =>
	signalStoreFeature(
		{
			state: type<
				AddToCartStoreState &
					AdditionsEntityState &
					RemovedAdditionsEntityState
			>(),
		},

		withMethods((store) => {
			return {
				toggleAddition: (addition: CartAddition) => {
					if (store.additionsEntityMap()[addition.id])
						patchState(
							store,
							removeEntity(addition.id, additionsEntityConfig),
						);
					else {
						const _additon: CartAddition = {
							...addition,
							quantity: 1,
						};

						patchState(
							store,
							addEntity(_additon, additionsEntityConfig),
						);

						//  remove from removedAdditions if it exists
						// if (store.removedAdditionsEntityMap()[addition.id])
						patchState(
							store,
							removeEntity(
								addition.id,
								removedAdditionsEntityConfig,
							),
						);
					}
				},

				toggleRemovedAddition: (addition: CartAddition) => {
					if (store.removedAdditionsEntityMap()[addition.id])
						patchState(
							store,
							removeEntity(
								addition.id,
								removedAdditionsEntityConfig,
							),
						);
					else {
						patchState(
							store,
							addEntity(addition, removedAdditionsEntityConfig),
						);

						//  remove from additions if it exists
						// if (store.additionsEntityMap()[addition.id])
						patchState(
							store,
							removeEntity(addition.id, additionsEntityConfig),
						);
					}
				},
			};
		}),

		withMethods((store) => {
			return {
				incrementAddition: (addition: CartAddition) => {
					if (!addition.id) return;
					if (!store.additionsEntityMap()[addition.id])
						return store.toggleAddition(addition);

					const _addition = {
						...store.additionsEntityMap()[addition.id],
					};

					_addition.quantity = (_addition.quantity ?? 0) + 1;

					patchState(
						store,
						updateEntity(
							{ id: addition.id, changes: _addition },
							additionsEntityConfig,
						),
					);
				},

				decrementAddition: (addition: CartAddition) => {
					if (!addition.id) return;
					if (!store.additionsEntityMap()[addition.id]) return;

					const _addition = {
						...store.additionsEntityMap()[addition.id],
					};
					if ((_addition.quantity ?? 0) <= 1)
						return store.toggleAddition(addition);

					_addition.quantity = (_addition.quantity ?? 2) - 1;

					if (_addition.quantity <= 0) _addition.quantity = 1;

					patchState(
						store,
						updateEntity(
							{ id: addition.id, changes: _addition },
							additionsEntityConfig,
						),
					);
				},
			};
		}),
	);
