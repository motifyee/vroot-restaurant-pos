import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
import { Tab } from './tab.model';
import { computed, signal } from '@angular/core';
import { deepCompare as deepMatch } from '../utils/utils';
import { tapResponse } from '@ngrx/operators';
import { Observable, of } from 'rxjs';
import { uuidv4 } from '../utils/uuid';
import { InvoiceIndexStore } from '@src/app/features';

export class InvoiceTab extends Tab {
	idxStore: InvoiceIndexStore;
	constructor(store: InvoiceIndexStore, invoice?: Invoice) {
		super('invoice');
		this.idxStore = store;

		if (invoice) this.#initialInvoice.set(invoice);
		this.#isNewInvoice.set(!!invoice);

		this.invoice.set(this.#initialInvoice());
	}

	_creationToken?: string;
	get creationToken() {
		return (this._creationToken ??= uuidv4());
	}

	override save(): Observable<any> {
		if (!this.hasChanges()) return of();

		// create | update invoice
		this.isLoading.set(true);

		let save = this.#isNewInvoice()
			? this.idxStore!.createInvoice({
					invoice: this.invoice(),
					creationToken: this.creationToken,
			  })
			: this.idxStore!.updateInvoice(this.invoice());

		return save.pipe(
			tapResponse({
				next: () => {
					this.#initialInvoice.set(this.invoice());
					this.#isNewInvoice.set(false);
				},
				error: () => {},
				finalize: () => this.isLoading.set(false),
			}),
		);
	}

	override discard() {
		this.invoice.set(this.#initialInvoice());
	}

	override onActivate() {
		throw new Error('Method not implemented.');
	}

	override onClose() {
		throw new Error('Method not implemented.');
	}

	override isLoading = signal(false);

	override title = computed(() => {
		let title = this.invoice().customer?.name;
		if (!title) title = this.invoice().id?.toString();
		if (!title) title = 'New';

		return title;
	});

	override icon = computed(() => 'pi pi-receipt');

	#initialInvoice = signal<Invoice>({} as Invoice);
	invoice = signal<Invoice>({} as Invoice);

	override hasChanges = computed(
		() => !deepMatch(this.#initialInvoice(), this.invoice()),
	);

	#isNewInvoice = signal(false);
}
