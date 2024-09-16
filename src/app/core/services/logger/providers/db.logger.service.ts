import { Inject, Injectable, inject } from '@angular/core';
import {
	LoggerProvider,
	LogSeverity as LSvrt,
	DBLoggerSeverityToken,
} from '../logger.model';

@Injectable({
	providedIn: 'root',
})
export class DbLoggerService extends LoggerProvider {
	public override token = DBLoggerSeverityToken;

	public override info(...messages: string[]): void {
		this.onSeverity(LSvrt.info, this.token, console.info, ...messages);
	}
	public override log(...messages: string[]): void {
		this.onSeverity(LSvrt.log, this.token, console.log, ...messages);
	}
	public override warn(...messages: string[]): void {
		this.onSeverity(LSvrt.warn, this.token, console.warn, ...messages);
	}
	public override error(...messages: string[]): void {
		this.onSeverity(LSvrt.error, this.token, console.error, ...messages);
	}
	public override _group(...messages: string[]): void {
		console.log(...messages);
	}
}
