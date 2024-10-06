import { computed, signal, Signal } from '@angular/core';
import { Tab } from './tab.model';
import { Observable, of } from 'rxjs';
import { InvoiceIndexStore } from '@src/app/features';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
import { EntityId } from '@ngrx/signals/entities';

export class InvoiceListTab extends Tab {
	store: InvoiceIndexStore;
	constructor(store: InvoiceIndexStore) {
		super('invoice-list');
		this.store = store;
	}

	override isLoading = signal(false);

	override save(): Observable<any> {
		if (!this.hasChanges()) return of(undefined);
		throw new Error('Method not implemented.');
	}

	override discard(): void {
		throw new Error('Method not implemented.');
	}

	override onActivate(): void {
		throw new Error('Method not implemented.');
	}

	override onClose(): void {
		throw new Error('Method not implemented.');
	}

	override hasChanges: Signal<boolean> = signal(false);

	override title: Signal<string> = signal('Invoices');
	override icon = computed(() =>
		this.isLoading() ? 'pi pi-spin pi-spinner' : 'pi pi-list',
	);

	invoices = computed(() => this.store.entities());
	selectedInvoices = computed(() => this.store.selectedIds());

	deleteInvoice = (invoice: Invoice) => {
		this.store.deleteInvoice(invoice);
	};
}
