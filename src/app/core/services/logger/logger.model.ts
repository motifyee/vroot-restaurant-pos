import { Injectable, InjectionToken, Injector, inject } from '@angular/core';

export const ConsoleLoggerSeverityToken = new InjectionToken<LogSeverity>(
	'ConsoleLoggerSeverityToken',
	{
		factory: () => LogSeverity.error, // default value if not provided
	},
);
export const DBLoggerSeverityToken = new InjectionToken<LogSeverity>(
	'DBLoggerSeverityToken',
	{
		factory: () => LogSeverity.error, // default value if not provided
	},
);
export const ServerLoggerSeverityToken = new InjectionToken<LogSeverity>(
	'ServerLoggerSeverityToken',
	{
		factory: () => LogSeverity.error, // default value if not provided
	},
);

// @Injectable({ providedIn: 'root' })
export abstract class ILogger {
	public abstract log(...messages: any[]): void;
	public abstract warn(...messages: any[]): void;
	public abstract error(...messages: any[]): void;
	public abstract info(...messages: any[]): void;
}

@Injectable({ providedIn: 'root' })
export abstract class LoggerProvider extends ILogger {
	public abstract token: InjectionToken<LogSeverity>;

	dbToken = inject(DBLoggerSeverityToken);
	serverToken = inject(ServerLoggerSeverityToken);
	consoleToken = inject(ConsoleLoggerSeverityToken);

	onSeverity(
		severity: LogSeverity,
		serverityToken: InjectionToken<LogSeverity>,
		fn: Function,
		...args: any[]
	) {
		let token = {
			[DBLoggerSeverityToken.toString()]: this.dbToken,
			[ServerLoggerSeverityToken.toString()]: this.serverToken,
			[ConsoleLoggerSeverityToken.toString()]: this.consoleToken,
		}[serverityToken.toString()];

		if (token >= severity) fn.apply(null, args);
	}

	public abstract _group(...messages: string[]): void;
}

export const enum LogSeverity {
	NONE = 0,
	error,
	warn,
	log,
	info,
}
