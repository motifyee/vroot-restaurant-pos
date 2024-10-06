import { ProviderToken } from '@angular/core';

export function storeType<T>(value: ProviderToken<T>): T {
	return undefined as never as T;
}
