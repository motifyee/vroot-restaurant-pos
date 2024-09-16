import { Observable } from 'rxjs';

export abstract class ShiftRepo {
	abstract getShift(config?: Config): Observable<Shift>;

	abstract openShift(config?: Config): Observable<void>;

	abstract closeShift(config?: Config): Observable<void>;
}
