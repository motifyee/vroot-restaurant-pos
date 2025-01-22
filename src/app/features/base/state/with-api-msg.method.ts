import { computed } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withState,
	withMethods,
	withComputed,
} from '@ngrx/signals';
import { featureType } from '@src/app/view/state/utils/utils';

export type ApiMsgTarget = string | symbol;

export type ApiMsgState = {
	_: {
		[target: ApiMsgTarget]: {
			msg: string;
			active: boolean;
		};
	};
};

const initialState: ApiMsgState = { _: {} };

const _defaultTarget = '__defaultTarget__';

/**
 * A signal store feature that provides API message management functionality.
 * This feature allows tracking and managing multiple API-related messages with their active states.
 *
 * @returns A signal store feature with API message management capabilities
 *
 * Key Functionality:
 * - Message Storage: Store messages with active states for different targets
 * - Message Management: Set, clear, activate/deactivate messages
 * - Message Retrieval: Get messages and check active states
 *
 * Methods:
 * - setApiMsg: Set a message for a target
 * - isApiMsgActive: Check if a target's message is active
 * - isAnyApiMsgActive: Check if any message in a set of targets is active
 * - getApiMsg: Get message for a target
 * - getAllApiMsgs: Get all messages for a set of targets
 * - getFirstActiveApiMsg: Get first active message from targets
 * - clearApiMsg: Remove message for a target
 * - clearAllApiMsgs: Remove messages for multiple targets
 * - deactivateApiMsg: Set a target's message as inactive
 * - deactivateAllApiMsgs: Set all messages as inactive
 *
 * @example
 * // Set a message
 * store.setApiMsg('Loading failed', 'LOAD_ERROR');
 *
 * // Check if message is active
 * const isActive = store.isApiMsgActive('LOAD_ERROR');
 *
 * // Get active message
 * const msg = store.getFirstActiveApiMsg(['LOAD_ERROR', 'SAVE_ERROR']);
 *
 * // Clear messages
 * store.clearAllApiMsgs(['LOAD_ERROR', 'SAVE_ERROR']);
 */
export function withApiMsg() {
	return signalStoreFeature(
		withState(initialState),
		withComputed((store) => {
			return {
				apiMsgs: computed(() => store._()),
			};
		}),
		withMethods((store) => ({
			_getKeys: (state: ApiMsgState['_'] = store._()) => {
				const symbolKeys = Object.getOwnPropertySymbols(state);
				const stringKeys = Object.keys(state);
				return [...symbolKeys, ...stringKeys];
			},
		})),
		withMethods((store) => {
			return {
				setApiMsg: (
					apiMsg: string,
					target: ApiMsgTarget = _defaultTarget,
				): void =>
					patchState(store, {
						_: {
							...store._(),
							[target]: {
								msg: apiMsg,
								active: true,
							},
						},
					}),

				// #####################################################################

				isApiMsgActive: (
					target: ApiMsgTarget = _defaultTarget,
				): boolean => store._()[target]?.active ?? false,

				isAnyApiMsgActive: (
					targets: ApiMsgTarget[] = store._getKeys(),
				): boolean =>
					targets.some((target) => store._()[target]?.active),

				// #####################################################################

				getApiMsg: (target: ApiMsgTarget = _defaultTarget): string =>
					store._()[target]?.msg ?? '',

				getAllApiMsgs: (
					targets: ApiMsgTarget[] = store._getKeys(),
				): string[] =>
					targets.reduce((acc, target) => {
						const msg = store._()[target]?.msg;
						if (msg) acc.push(msg);
						return acc;
					}, [] as string[]),

				getFirstActiveApiMsg: (
					targets: ApiMsgTarget[] = store._getKeys(),
				): string | null => {
					const target = targets.find(
						(target) => store._()[target]?.active,
					);

					return target ? store._()[target]?.msg : null;
				},

				// #####################################################################

				clearApiMsg: (target: ApiMsgTarget = _defaultTarget): void => {
					const state = { ...store._() };
					delete state[target];

					patchState(store, { _: state });
				},

				clearAllApiMsgs: (
					targets: ApiMsgTarget[] = store._getKeys(),
				): void => {
					const _targets = targets.reduce(
						(acc, target) => {
							acc[target] = true;
							return acc;
						},
						{} as { [key: ApiMsgTarget]: boolean },
					);

					const state = { ...store._() };

					store
						._getKeys(state)
						.forEach((key) => _targets[key] && delete state[key]);

					patchState(store, { _: state });
				},

				deactivateApiMsg: (
					target: ApiMsgTarget = _defaultTarget,
				): void =>
					patchState(store, {
						_: {
							...store._(),
							[target]: {
								...store._()[target],
								active: false,
							},
						},
					}),

				deactivateAllApiMsgs: (): void => {
					const state = { ...store._() };

					store
						._getKeys(state)
						.forEach((key) => (state[key].active = false));

					patchState(store, { _: state });
				},
			};
		}),
	);
}

const _i = featureType(withApiMsg);

export type ApiMsgMethods = typeof _i.methods;
