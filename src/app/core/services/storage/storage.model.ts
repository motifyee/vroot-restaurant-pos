/* eslint-disable no-unused-vars */

import { InjectionToken } from '@angular/core';

export type StorageKey = 'settings' | 'logs' | 'session' | string;

export const STORAGE = new InjectionToken<StorageProvider>('STORAGE');

export abstract class StorageProvider {
	/**
	 * Retrieves a key and its value from the storage
	 * @param key storage key
	 * @param parse whether to parse the value or not
	 *
	 * @returns the value of the key;
	 * this method will return an empty string if the key doesn't exist
	 */
	public abstract get<T>(key: StorageKey, parse?: boolean): string | T;
	/**
	 * Stores a key and its value in the storage
	 * @param key storage key
	 * @param value the value to be stored; will stringify if it's an object
	 * @returns void
	 */
	public abstract set(key: StorageKey, value: string | object): void;
	/**
	 * Deletes a key and its value from the storage
	 * @param key storage key
	 * @returns void
	 */
	public abstract remove(key: StorageKey): void;
	/**
	 * Deletes all keys and values from the storage
	 * @returns void
	 */
	public abstract clear(): void;
}
