import { Injectable } from '@angular/core';
import { StorageProvider, StorageKey } from '../storage.model';
import { JSONParse } from '../../../util/json';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService implements StorageProvider {
	get = <T>(key: StorageKey, parse = false) => {
		let value: T | string = localStorage.getItem(key) ?? '';
		if (parse) value = JSONParse(value) as T;
		return value;
	};

	set = (key: StorageKey, value: string | object) => {
		if (typeof value != 'string') value = JSON.stringify(value);
		localStorage.setItem(key, value);
	};

	remove = (key: StorageKey) => localStorage.removeItem(key);

	clear = () => localStorage.clear();
}
