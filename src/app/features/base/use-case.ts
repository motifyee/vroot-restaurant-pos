import { Observable } from 'rxjs';

export interface UseCase<S, T> {
	execute(params: S | Config, config?: Config): Observable<T>;
}
