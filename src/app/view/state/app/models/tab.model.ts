import { Signal } from '@angular/core';
import { deepMatch } from '../utils/utils';
import { Observable } from 'rxjs';
import { uuidv4 } from '../utils/uuid';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';

export type TabType = 'invoice' | 'invoice-list';

export abstract class Tab {
	type: TabType;

	constructor(type: TabType) {
		this.type = type;
	}

	abstract save(): Observable<any>;
	abstract discard(): void;
	abstract onActivate(): void;
	abstract onClose(): void;
	abstract hasChanges: Signal<boolean>;
	abstract isLoading: Signal<boolean>;
	abstract title: Signal<string>;
	abstract icon: Signal<string>;

	private _id?: string;
	get id() {
		return (this._id ??= uuidv4());
	}
}

export interface Tabx extends IdxSignature {
	get id(): string;
	type: TabType;

	save(): Observable<any>;
	discard(): void;
	onActivate(): void;
	onClose(): void;
	hasChanges: boolean;
	isLoading: boolean;
	title: string;
	icon: string;
}

export interface InvoiceListTabx extends Tabx {
	type: 'invoice-list';
}
export interface InvoiceTabx extends Tabx {
	type: 'invoice';

	get creationToken(): string;
	initialInvoice: Invoice;
	invoice: Invoice;
	hasChanges: boolean;
	isNewInvoice: boolean;
}

// export const createInvoiceTab = (
// 	invoiceTab: Partial<InvoiceTabx>,
// ): InvoiceTabx => {
// 	return {
// 		id: '12',
// 		_creationToken: undefined,
// 		get creationToken() {
// 			return (this['_creationToken'] ??= uuidv4());
// 		},
// 		get hasChanges() {
// 			return !deepMatch(this.initialInvoice, this.invoice);
// 		},
// 		isNewInvoice: false,
// 		initialInvoice: {} as Invoice,
// 		invoice: {} as Invoice,
// 		save: () => {},
// 		...invoiceTab,
// 		type: 'invoice',
// 	};
// };
