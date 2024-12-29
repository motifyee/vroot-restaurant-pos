import { Observable } from 'rxjs';

export interface UseCase<S, T> {
	execute(params: S | Config, config?: Config): Observable<T>;
}

export interface SyncUseCase<S, T> {
	execute(params: S | Config, config?: Config): T;
}
