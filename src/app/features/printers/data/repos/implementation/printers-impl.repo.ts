import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ENV, HttpService } from '@src/app/core';
import { PrintersRepo } from '../../../domain';

export class PrintersImplRepo implements PrintersRepo {
	http = inject(HttpService);

	getPrinters(
		params: { deviceId: string },
		config?: Config,
	): Observable<Printer[]> {
		return this.http
			.get<Response<Printer[]>>(
				`${ENV.endpoint}/api/printers`,
				{
					headers: { deviceId: params.deviceId },
				},
				config,
			)
			.pipe(map((res) => res.data!));
	}

	getPosDevices(config: Config): Observable<PosDevice[]> {
		return this.http
			.get<
				Response<PosDevice[]>
			>(`${ENV.endpoint}/api/posDevices`, undefined, config)
			.pipe(map((res) => res.data!));
	}

	printersMap(
		params: { productIds: number[] },
		config: Config,
	): Observable<{ [printerId: string]: string[] }> {
		return this.http
			.post<
				Response<{ [printerId: string]: string[] }>
			>(`${ENV.endpoint}/api/posDevices`, { productIds: params.productIds }, { headers: { mapPrinters: true } }, config)
			.pipe(map((res) => res.data!));
	}
}
