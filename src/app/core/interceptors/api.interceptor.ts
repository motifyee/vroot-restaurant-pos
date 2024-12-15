import { Injectable, inject } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpSentEvent,
	HttpHeaderResponse,
	HttpProgressEvent,
	HttpResponse,
	HttpUserEvent,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, tap, throwError, timer } from 'rxjs';
import { IS_DEVMODE, StorageService } from '../';
import { HttpService } from '../services';

type APILoadingStatus = 'loading' | 'loaded' | 'error';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private storage = inject(StorageService);

	// =========================================================================
	// API Loading Notification

	private http = inject(HttpService);
	private isAPILoading = this.http.loadingAPIs;
	private loadedAPIs = this.http.loadedAPIs;
	private errorAPIs = this.http.errorAPIs;
	private API_LOADING_KEY = this.http.API_LOADING_KEY;

	private loadingAPIs = new Map<string, string>();

	/**
	 * marks the api as loading, loaded or error
	 *
	 * notifies the subscribers of `isAPILoading`, `isAPILoaded` and
	 * `isAPIError` on the http service with the `apiLoadingKey` as the
	 * grouping key to filter the notifications
	 *
	 * @param request HttpRequest
	 * @param status `loading` | `loaded` | `error`
	 */
	private notifyAPILoading(
		request: HttpRequest<unknown>,
		status: APILoadingStatus,
	) {
		const url = request.urlWithParams;

		if (status === 'loading') {
			const apiLoadingKey = request.headers.get(this.API_LOADING_KEY);
			request.headers.delete(this.API_LOADING_KEY);

			this.loadingAPIs.set(url, apiLoadingKey || url || '');
			this.isAPILoading.next(apiLoadingKey || url || '');
			return;
		}

		const key = this.loadingAPIs.get(url) || '';
		this.loadingAPIs.delete(url);

		if (status === 'error') return this.errorAPIs.next(key);

		this.loadedAPIs.next(key);
	}

	// =========================================================================
	// Add Common Headers And Token To Request

	/**
	 * add token to the request's headers
	 * @param request HttpRequest
	 */
	private appendToken(request: HttpRequest<unknown>) {
		const token = this.storage.get('token'),
			setHeaders = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			} as { [key: string]: string };

		if (token) setHeaders['Authorization'] = 'Bearer ' + token;

		return request.clone({ setHeaders });
	}

	// =========================================================================
	// Handle API Errors

	/**
	 * middleware to handle api errors and rethrows it
	 * @param request HttpRequest
	 */
	// !!TODO: handle error structure
	private handleError =
		(request: HttpRequest<unknown>) =>
		(
			err: { status: number; message: string },
			caught: Observable<
				| HttpSentEvent
				| HttpHeaderResponse
				| HttpProgressEvent
				| HttpResponse<unknown>
				| HttpUserEvent<unknown>
			>,
		) => {
			// if (error.status === 401) { this.router.navigate(['login']); }
			this.notifyAPILoading(request, 'error');

			// caught.subscribe();
			return throwError(() => err as never);
		};

	// =========================================================================
	// Intercept Request

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		this.notifyAPILoading(request, 'loading');

		request = this.appendToken(request);

		return next.handle(request).pipe(
			tap(() => this.notifyAPILoading(request, 'loaded')),
			// retry({
			// 	count: 3,
			// 	delay: (err, retryCount) => {
			// 		if (IS_DEVMODE) return throwError(() => err);

			// 		if (err instanceof HttpErrorResponse && err.status === 0)
			// 			return timer(retryCount * 1000);

			// 		return throwError(() => err);
			// 	},
			// }),
			catchError(this.handleError(request)),
		);
	}
}
