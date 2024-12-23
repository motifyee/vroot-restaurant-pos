import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { ProductsPanelComponent } from './components/products-panel/products-panel.component';
import { InvoicePanelComponent } from '../shared/invoice-panel/invoice-panel.component';
import { invoiceStore } from '@src/app/features/invoices/state/invoice/invoice.store';
import { Tab } from '../../../state/app/models/tab.model';
import { InvoiceTab } from '../../../state/app/models/invoice-tab.model';

@Component({
    selector: 'invoice-tab',
    imports: [ProductsPanelComponent, InvoicePanelComponent],
    templateUrl: './invoice-tab.component.html',
    styleUrl: './invoice-tab.component.scss',
    providers: [invoiceStore]
})
export class InvoiceTabComponent {
	tab = input.required<Tab>();

	invoiceStore = inject(invoiceStore);

	invoice = computed(() => (this.tab() as InvoiceTab).invoice());
}
