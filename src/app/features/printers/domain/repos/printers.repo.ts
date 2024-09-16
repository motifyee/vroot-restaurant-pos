import { Observable } from 'rxjs';

export abstract class PrintersRepo {
	abstract getPrinters(
		params: {
			deviceId: string;
		},
		config?: Config,
	): Observable<Printer[]>;

	abstract getPosDevices(config?: Config): Observable<PosDevice[]>;

	abstract printersMap(
		params: {
			productIds: number[];
		},
		config?: Config,
	): Observable<{ [printerId: string]: string[] }>;
}
