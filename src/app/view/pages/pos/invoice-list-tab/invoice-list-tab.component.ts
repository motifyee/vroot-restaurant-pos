import { Component, computed, inject, input } from '@angular/core';
import { Tab } from '../../../state/app/models/tab.model';
import { InvoiceListPanelComponent } from './components/invoice-list-panel/invoice-list-panel.component';
import { InvoicePanelComponent } from '../shared/invoice-panel/invoice-panel.component';
import { invoiceIndexStore } from '@src/app/features';

@Component({
	selector: 'invoice-list-tab',
	standalone: true,
	imports: [InvoiceListPanelComponent, InvoicePanelComponent],
	templateUrl: './invoice-list-tab.component.html',
	styleUrl: './invoice-list-tab.component.scss',
})
export class InvoiceListTabComponent {
	tab = input.required<Tab>();

	idxStore = inject(invoiceIndexStore);

	invoices = computed(() => this.idxStore.entities());
	products = computed(
		() => this.idxStore.selectedInvoices()[0]?.products ?? [],
	);
}
