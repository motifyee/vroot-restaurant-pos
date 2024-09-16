import { inject, Inject, Injectable } from '@angular/core';
import { LoggerProvider, ILogger } from './logger.model';

@Injectable({
	providedIn: 'root',
})
export class LoggerService extends ILogger {
	// @Inject(LogProvider) private providers?: LogProvider[];
	constructor(@Inject(LoggerProvider) private providers: LoggerProvider[]) {
		super();
	}

	static WithHeaderSymbol = Symbol('log-with-header');
	static injectWithHeader(header: string) {
		let logger = inject(LoggerService);

		return {
			info: (...args: any[]) =>
				logger.info(LoggerService.WithHeaderSymbol, header, ...args),
			log: (...args: any[]) =>
				logger.log(LoggerService.WithHeaderSymbol, header, ...args),
			warn: (...args: any[]) =>
				logger.warn(LoggerService.WithHeaderSymbol, header, ...args),
			error: (...args: any[]) =>
				logger.error(LoggerService.WithHeaderSymbol, header, ...args),
		};
	}

	public override log(...messages: any[]) {
		this.providers?.forEach((p) => p.log(...messages));
	}

	public override warn(...messages: any[]) {
		this.providers?.forEach((p) => p.warn(...messages));
	}

	public override info(...messages: any[]) {
		this.providers?.forEach((p) => p.info(...messages));
	}

	public override error(...messages: any[]) {
		this.providers?.forEach((p) => p.error(...messages));
	}
}
