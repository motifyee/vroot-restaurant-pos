import { computed } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withState,
	withMethods,
	withComputed,
} from '@ngrx/signals';
import { featureType } from '@src/app/view/state/utils/utils';

export type SimpleApiMsgState = {
	apiMsg: string;
	apiMsgActive: boolean;
};

const initialState: SimpleApiMsgState = {
	apiMsg: '',
	apiMsgActive: false,
};

/**
 * A simplified signal store feature for managing a single API message.
 * Provides basic functionality to set, clear, and check the status of an API message.
 *
 * @returns A signal store feature with simple API message management
 *
 * Methods:
 * - setApiMsg: Set the message and activate it
 * - clearApiMsg: Clear the message
 * - deactivateApiMsg: Keep the message but mark as inactive
 *
 * Computed:
 * - apiMsg: Get the current message
 * - isApiMsgActive: Check if message is active
 *
 * @example
 * // Set a message
 * store.setApiMsg('Operation failed');
 *
 * // Check if active
 * const isActive = store.isApiMsgActive();
 *
 * // Get message
 * const msg = store.apiMsg();
 *
 * // Clear message
 * store.clearApiMsg();
 */
export function withSimpleApiMsg() {
	return signalStoreFeature(
		withState(initialState),
		withComputed((store) => ({
			apiMsg: computed(() => store.apiMsg()),
			isApiMsgActive: computed(() => store.apiMsgActive()),
		})),
		withMethods((store) => ({
			setApiMsg: (msg: string): void =>
				patchState(store, {
					apiMsg: msg,
					apiMsgActive: true,
				}),

			clearApiMsg: (): void =>
				patchState(store, {
					apiMsg: '',
					apiMsgActive: false,
				}),

			deactivateApiMsg: (): void =>
				patchState(store, {
					apiMsgActive: false,
				}),
		})),
	);
}

const _i = featureType(withSimpleApiMsg);
export type SimpleApiMsgMethods = typeof _i.methods;
