import { Component, input } from '@angular/core';
import { InvoiceStore } from '@src/app/features/invoices/state/invoice/invoice.store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'invoice-panel',
	standalone: true,
	imports: [CardModule, DividerModule, TableModule, ButtonModule],
	templateUrl: './invoice-panel.component.html',
	styleUrl: './invoice-panel.component.scss',
})
export class InvoicePanelComponent {
	products = [
		{
			code: 'P001',
			name: "Product 1's name it a bit lengthy to overflow below",
			category: 'Category 1',
			quantity: 55,
		},
		{
			code: 'P002',
			name: 'Product 2',
			category: 'Category 2',
			quantity: 10,
		},
		{
			code: 'P003',
			name: 'Product 3',
			category: 'Category 3',
			quantity: 15,
		},
		{
			code: 'P004',
			name: 'Product 4',
			category: 'Category 4',
			quantity: 20,
		},
		{
			code: 'P005',
			name: 'Product 5',
			category: 'Category 5',
			quantity: 25,
		},
		{
			code: 'P006',
			name: 'Product 6',
			category: 'Category 6',
			quantity: 30,
		},
		{
			code: 'P007',
			name: 'Product 7',
			category: 'Category 7',
			quantity: 35,
		},
		{
			code: 'P008',
			name: 'Product 8',
			category: 'Category 8',
			quantity: 40,
		},
		{
			code: 'P009',
			name: 'Product 9',
			category: 'Category 9',
			quantity: 45,
		},
		{
			code: 'P010',
			name: 'Product 10',
			category: 'Category 10',
			quantity: 50,
		},
		{
			code: 'P001',
			name: 'Product 1',
			category: 'Category 1',
			quantity: 5,
		},
		{
			code: 'P002',
			name: 'Product 2',
			category: 'Category 2',
			quantity: 10,
		},
		{
			code: 'P003',
			name: 'Product 3',
			category: 'Category 3',
			quantity: 15,
		},
		{
			code: 'P004',
			name: 'Product 4',
			category: 'Category 4',
			quantity: 20,
		},
		{
			code: 'P005',
			name: 'Product 5',
			category: 'Category 5',
			quantity: 25,
		},
		{
			code: 'P006',
			name: 'Product 6',
			category: 'Category 6',
			quantity: 30,
		},
		{
			code: 'P007',
			name: 'Product 7',
			category: 'Category 7',
			quantity: 35,
		},
		{
			code: 'P008',
			name: 'Product 8',
			category: 'Category 8',
			quantity: 40,
		},
		{
			code: 'P009',
			name: 'Product 9',
			category: 'Category 9',
			quantity: 45,
		},
		{
			code: 'P010',
			name: 'Product 10',
			category: 'Category 10',
			quantity: 50,
		},
	];

	invoiceInfo = [
		{
			title: 'Service',
			value: '12',
		},
		{
			title: 'Delivery',
			value: '30',
		},
		{
			title: 'Total',
			value: '42',
		},
	];
}
