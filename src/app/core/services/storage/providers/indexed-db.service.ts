import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage.model';

@Injectable({
	providedIn: 'root',
})
export class IndexedDBService extends StorageProvider {
	public override get<T>(key: string, parse: boolean): string | T {
		throw new Error('Method not implemented.');
	}
	public override set(key: string, value: string | object): void {
		throw new Error('Method not implemented.');
	}
	public override remove(key: string): void {
		throw new Error('Method not implemented.');
	}
	public override clear(): void {
		throw new Error('Method not implemented.');
	}
}
