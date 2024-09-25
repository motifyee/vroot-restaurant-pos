import { Component, input } from '@angular/core';
import { Tab } from '../../stores/app/models/tab.model';
import { InvoiceListPanelComponent } from '../invoice-list-panel/invoice-list-panel.component';
import { InvoicePanelComponent } from '../invoice-panel/invoice-panel.component';

@Component({
	selector: 'invoice-list-tab',
	standalone: true,
	imports: [InvoiceListPanelComponent, InvoicePanelComponent],
	templateUrl: './invoice-list-tab.component.html',
	styleUrl: './invoice-list-tab.component.scss',
})
export class InvoiceListTabComponent {
	tab = input.required<Tab>();
}
