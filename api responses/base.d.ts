declare interface API {
	[title: string]: {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		url: string;
		notes?: string;
		headers?: any;
		payload?: any;
		successCode: 200 | 201 | 204 | 400 | 404 | 500 | number[];
		response?: Partial<Response<any>>;
	};
}

interface IError {
	code: number;
	message?: string;
}

interface IResponseError extends IError {
	errorType?: string;
	details?: Error[];
}

declare interface Pagination {
	page: number;
	next: string;
	prev: string;
	pages_count: number;
	total: number;
}

declare interface PaginationPayload {
	pageNo: number;
	pageSize: number;
}

interface Response<T> {
	// success: boolean;
	meta?: {
		code: number;
		message?: string;
	};
	error?: IResponseError;
	data?: T;
	pagination?: Partial<Pagination>;
}
