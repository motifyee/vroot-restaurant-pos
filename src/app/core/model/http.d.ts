/**
 *
 * @param apiLoadingKey a string to identify the api request to receive loading
 * notifications. If not provided, the url will be used as the key instead.
 */
declare type Config = {
	apiLoadingKey?: string | number | string[] | number[];
};

declare type HTTPOptions<
	T extends 'json' | 'arraybuffer' | 'blob' | 'document' | 'text',
> =
	| {
			headers?:
				| HttpHeaders
				| {
						[header: string]: string | string[];
				  };
			context?: HttpContext;
			params?:
				| HttpParams
				| {
						[param: string]:
							| string
							| number
							| boolean
							| ReadonlyArray<string | number | boolean>;
				  };
			reportProgress?: boolean;
			responseType?: T;
			// | 'json'
			// | 'arraybuffer'
			// | 'blob'
			// | 'text'
			// | 'document';
			// observe?: 'body' | 'events' | 'response';
			// observeEvents?: 'body' | 'events' | 'response';
			withCredentials?: boolean;
	  }
	| undefined;
