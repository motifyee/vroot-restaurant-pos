import { Injectable } from '@angular/core';
import { LoggerProvider, ServerLoggerSeverityToken } from '../logger.model';

@Injectable({
	providedIn: 'root',
})
export class ServerLoggerService extends LoggerProvider {
	public override token = ServerLoggerSeverityToken;

	public override log(...messages: string[]): void {
		throw new Error('Method not implemented.');
	}
	public override warn(...messages: string[]): void {
		throw new Error('Method not implemented.');
	}
	public override error(...messages: string[]): void {
		throw new Error('Method not implemented.');
	}
	public override info(...messages: string[]): void {
		throw new Error('Method not implemented.');
	}
	public override _group(...messages: string[]): void {
		throw new Error('Method not implemented.');
	}
}
