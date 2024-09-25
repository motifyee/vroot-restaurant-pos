import { Component, inject, input } from '@angular/core';
import { ProductsPanelComponent } from '../products-panel/products-panel.component';
import { InvoicePanelComponent } from '../invoice-panel/invoice-panel.component';
import { invoiceStoreToken } from '@src/app/features/invoices/state/invoice/invoice.store';
import { Tab } from '../../stores/app/models/tab.model';

@Component({
	selector: 'invoice-tab',
	standalone: true,
	imports: [ProductsPanelComponent, InvoicePanelComponent],
	templateUrl: './invoice-tab.component.html',
	styleUrl: './invoice-tab.component.scss',
	providers: [invoiceStoreToken],
})
export class InvoiceTabComponent {
	tab = input.required<Tab>();
	invoiceStore = inject(invoiceStoreToken);
}
