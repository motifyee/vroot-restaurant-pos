import { Injectable, inject } from '@angular/core';
import { StorageProvider, STORAGE } from './storage.model';
import { LocalStorageService } from './providers/local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class StorageService implements StorageProvider {
	storage = inject(STORAGE);

	get = this.storage.get;
	set = this.storage.set;
	remove = this.storage.remove;
	clear = this.storage.clear;
}
