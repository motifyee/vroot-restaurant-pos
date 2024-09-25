import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { uuidv4 } from '../utils/uuid';

export type TabType = 'invoice' | 'invoice-list';

export abstract class Tab {
	type: TabType;

	constructor(type: TabType) {
		this.type = type;
	}

	abstract save(): Observable<any>;
	abstract discard(): void;
	abstract onActivate(): void;
	abstract onClose(): void;
	abstract hasChanges: Signal<boolean>;
	abstract isLoading: Signal<boolean>;
	abstract title: Signal<string>;
	abstract icon: Signal<string>;

	private _id?: string;
	get id() {
		return (this._id ??= uuidv4());
	}
}
