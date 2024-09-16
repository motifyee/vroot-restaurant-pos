interface IError {
	code: number;
	message?: string;
}

interface IResponseError extends IError {
	errorType?: string;
	details?: Error[];
}

declare interface Response<T> {
	success: boolean;
	meta?: {
		code: number;
		message?: string;
	};
	error?: IResponseError;
	data?: T;
	pagination?: {
		page: number;
		next: string;
		prev: string;
		pages_count: number;
		total: number;
	};
}
