import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './providers/local-storage.service';
import { IndexedDBService } from './providers/indexed-db.service';
import { STORAGE } from './storage.model';
import { OPFSStorageService } from './providers/opfs.service';
import { SQliteStorageService } from './providers/sqlite.service';
import { StorageService } from './storage.service';

@NgModule({
	declarations: [],
	providers: [
		StorageService,

		LocalStorageService,
		IndexedDBService,
		OPFSStorageService,
		SQliteStorageService,
	],
})
export class StorageModule {
	static forLocalStorage(): ModuleWithProviders<StorageModule> {
		return {
			ngModule: StorageModule,
			providers: [
				{
					provide: STORAGE,
					useClass: LocalStorageService,
				},
			],
		};
	}

	static forIndexedDB(): ModuleWithProviders<StorageModule> {
		return {
			ngModule: StorageModule,
			providers: [
				{
					provide: STORAGE,
					useClass: IndexedDBService,
				},
			],
		};
	}
}
