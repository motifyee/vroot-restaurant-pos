import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {
	zone = inject(NgZone);

	public override handleError(error: any): void {
		// using to allow async errors to be caught gracefully
		// TODO: Revisit angular's internal implementation once they drop zone.js
		//       in favor of signals
		this.zone.run(() => {
			console.warn('Custom::', error);
		});
	}
}
