import { Injectable, inject } from '@angular/core';
import {
	HttpClient,
	HttpContext,
	HttpHeaders,
	HttpParams,
} from '@angular/common/http';
import { Observable, Subject, filter } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	http = inject(HttpClient);

	// =========================================================================
	// API Loading Notification

	public readonly API_LOADING_KEY = 'api-loading-key';

	private _filterObs(keys: string[], obs: Observable<string>) {
		if (!keys.length) return obs;

		return obs.pipe(filter((k) => (keys as string[]).includes(k)));
	}

	errorAPIs = new Subject<string>();
	private _errorAPIs: Observable<string> | undefined;
	public onError$(...keys: string[]) {
		this._errorAPIs ??= this.errorAPIs.asObservable();
		return this._filterObs(keys, this._errorAPIs);
	}

	loadingAPIs = new Subject<string>();
	private _loadingAPIs: Observable<string> | undefined;
	public onLoading$(keys: string[]) {
		this._loadingAPIs ??= this.loadingAPIs.asObservable();
		return this._filterObs(keys, this._loadingAPIs);
	}

	loadedAPIs = new Subject<string>();
	private _loadedAPIs: Observable<string> | undefined;
	public onLoaded$(keys: string[]) {
		this._loadedAPIs ??= this.loadedAPIs.asObservable();
		return this._filterObs(keys, this._loadedAPIs);
	}

	// =========================================================================
	// API Requests

	private applyOptions(
		headers: IdxSignature | undefined,
		options: IdxSignature,
	) {
		if (!headers) return {};

		const { apiLoadingKey } = options;
		if (apiLoadingKey) headers[this.API_LOADING_KEY] = apiLoadingKey;
		return headers;
	}

	get<T>(
		url: string,
		options = {} as HTTPOptions<'json'>,
		config: Config = {},
	) {
		if (options)
			options.headers = this.applyOptions(options.headers, config);
		return this.http.get<T>(url, options);
	}

	getText(
		url: string,
		options = {} as HTTPOptions<'text'>,
		config: Config = {},
	) {
		if (options)
			options.headers = this.applyOptions(options.headers, config);
		return this.http.get(url, { ...options, responseType: 'text' });
	}

	post<T>(
		url: string,
		body = {} as IdxSignature,
		options = {} as HTTPOptions<'json'>,
		config: Config = {},
	) {
		if (options)
			options.headers = this.applyOptions(options.headers, config);
		return this.http.post<T>(url, body, options);
	}

	put<T>(
		url: string,
		body = {} as IdxSignature,
		options = {} as HTTPOptions<'json'>,
		config: Config = {},
	) {
		if (options)
			options.headers = this.applyOptions(options.headers, config);
		return this.http.put<T>(url, body, options);
	}

	delete<T>(
		url: string,
		options = {} as HTTPOptions<'json'>,
		config: Config = {},
	) {
		if (options)
			options.headers = this.applyOptions(options.headers, config);
		return this.http.delete<T>(url, options);
	}
}
