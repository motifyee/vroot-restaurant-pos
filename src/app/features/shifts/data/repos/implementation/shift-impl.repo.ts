import { map, Observable } from 'rxjs';
import { ShiftRepo } from '../../../domain/repos';
import { ENV, HttpService } from '@core';
import { inject } from '@angular/core';

export class ShiftImplRepo implements ShiftRepo {
	#http = inject(HttpService);

	getShift(config?: Config): Observable<Shift> {
		return this.#http
			.get<Response<Shift>>(
				`${ENV.endpoint}/api/shifts`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!));
	}

	openShift(config?: Config): Observable<void> {
		return this.#http.post(
			`${ENV.endpoint}/api/shifts`,
			undefined,
			undefined,
			config,
		);
	}

	closeShift(config?: Config): Observable<void> {
		return this.#http.put(
			`${ENV.endpoint}/api/shifts`,
			undefined,
			{ params: { close: true } },
			config,
		);
	}
}
