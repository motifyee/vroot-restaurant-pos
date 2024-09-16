import { DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

export const rxjsCleaner = () => {
	const destroyRef = inject(DestroyRef);
	return new Subscriber(destroyRef);
};

class Subscriber {
	constructor(private destroyRef: DestroyRef) {
		destroyRef.onDestroy(() => {
			this.destroyed$.next();
			this.destroyed$.complete();
		});
	}

	destroyed$ = new Subject<void>();
}
