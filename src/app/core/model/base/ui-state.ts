import { signal } from '@angular/core';
import { mapSignalUpdater } from '../../util';
import { timer } from 'rxjs';

export interface UIStateReducer extends IdxSignature {
	get: (prop: UIStateKey) => UIStateValue;
	set: (prop: UIStateKey, value: UIStateValue, duration?: number) => void;
	delete: (prop: UIStateKey) => void;
	reset: () => void;
	// update: ( prop: UIStateKey, fn: (value: UIStateValue) => UIStateValue, duration?: number,) => void;
}

export const UI_LOADING = Symbol('ui-loading');
export const UI_FLASH = Symbol('ui-flash');

export type UIStateValues = string | number | symbol | boolean;
export type UIStateKey = string | number | symbol | boolean;
export type UIStateValue = string | number | symbol | boolean | undefined;

export const uiState = () => {
	let state = signal(new Map<UIStateKey, UIStateValue>()),
		updateUISignal = mapSignalUpdater(state),
		reducer: UIStateReducer = {
			// state,
			get: (prop) => state().get(prop),
			set: (prop, value, duration) => {
				updateUISignal((_state) => {
					_state.set(prop, value);
					return _state;
				});

				if (duration)
					timer(duration).subscribe(() => reducer.delete(prop));
			},
			delete: (prop: UIStateKey) => {
				updateUISignal((_state) => {
					_state.delete(prop);
					return _state;
				});
			},
			reset: () => updateUISignal(() => new Map()),
		};

	return reducer;
};

export class UIState {
	// =========================================================================
	// UI
	ui = uiState();

	// updateUI = signalUpdater<UIActions>(this.ui);

	get loading() {
		return this.ui.get(UI_LOADING);
	}

	set loading(value) {
		if (value) this.ui.set(UI_LOADING, value);
		else this.ui.delete(UI_LOADING);
	}

	get flash() {
		return this.ui.get(UI_FLASH);
	}

	doFlash(duration = 100) {
		this.ui.set(UI_FLASH, true, duration);
	}

	setLoadingAndFlash() {
		this.loading = true;
		this.doFlash();
	}

	setLoadedAndFlash() {
		this.loading = false;
		this.doFlash();
	}
}
