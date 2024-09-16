// =============================================================================
//  portable observable

import { AsyncSubject, Observable } from 'rxjs';

/**
 * @type `(..retValue: any[]) => Observable<T[]>` is the complete observable function
 * @type `obs$`: `Observable<T[]>` is the obeservable
 * @type `callCount`: `number` is the `portableObs` function calls count before obs$ completes
 */
type PortableObs<T> = [
	(...retValue: any[]) => Observable<T[]>,
	Observable<T[]>,
	number,
];

const _observables = {} as { [key: string]: PortableObs<any> };

/**
 * creates a finite observable
 * useful when converting complex logic in a function to an observable without touching it
 * to figure out when it completes fetching or performing it's code
 * @param completeCallCount `completeObs` calls count to complete and return the observable
 * @param hookName `string` unique name to cache [`completeObs`, `obs$`] accross multiple
 * main function (`portableObs`) calls.
 * @returns `[(...retValue: any[]) => Observable<T[]>, Observable<T[]>, number]`.
 */

// TODO implement completeObs(count) for multiple steps call;
export function portableObs<T>(
	completeCallCount = 1,
	hookName?: string,
): PortableObs<T> {
	if (hookName && hookName in _observables) {
		let ret = _observables[hookName];
		ret[2] += 1;
		return ret as PortableObs<T>;
	}

	let sub = new AsyncSubject<T[]>(),
		obs$ = sub.asObservable(),
		accArr = [],
		completeObs = (...retValue: T[]) => {
			accArr.push(1);
			if (accArr.length != completeCallCount) return obs$;

			sub.next(retValue);
			sub.complete();

			hookName && delete _observables[hookName];

			return obs$;
		};

	let ret = [completeObs, obs$, 0] as PortableObs<T>;
	if (hookName) _observables[hookName] = ret;

	return ret;
}
