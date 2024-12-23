import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { invoiceIndexStore } from '@src/app/features';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'invoice-list-panel',
    imports: [
        JsonPipe,
        TableModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        TagModule,
    ],
    templateUrl: './invoice-list-panel.component.html',
    styleUrl: './invoice-list-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceListPanelComponent {
	invoices: Partial<Invoice>[] = [
		{
			id: 1,
			branchDateFlag: 1,
			netPrice: 1000,
			invoiceTax: 12,
			preparationNotes: 'preparationNotes',
			employeeNote: 'employeeNote',
			clientNote: 'clientNote',
			invoiceType: 'sales',
			customer: {
				id: '1',
				name: 'Customer 1',
				phone: '01000000000',
				mobile: '01000000000',
				classification: {
					id: 1,
					title: 'danger',
					color: 'red',
				},
			},
			products: [
				{
					id: 1,
					productVariant: {
						id: 1,
						title: 'Product 1',
						price: 10,
					},
					quantity: 1,
					price: 10,
					totalPrice: 412,
					note: 'note',
				},
				{
					id: 2,
					productVariant: {
						id: 2,
						title: 'Product 2',
						price: 20,
					},
					quantity: 1,
					price: 10,
					totalPrice: 23,
					note: 'note',
				},
				{
					id: 3,
					productVariant: {
						id: 3,
						title: 'Product 3',
						price: 30,
					},
					quantity: 1,
					price: 10,
					totalPrice: 20,
					note: 'note',
				},
				{
					id: 4,
					productVariant: {
						id: 4,
						title: 'Product 4',
						price: 40,
					},
					quantity: 1,
					price: 10,
					totalPrice: 242,
					note: 'note',
				},
			],
		},
		{
			id: 2,
			branchDateFlag: 2,
			netPrice: 1000,
			invoiceTax: 12,
			preparationNotes: 'preparationNotes',
			employeeNote: 'employeeNote',
			clientNote: 'clientNote',
			invoiceType: 'sales',
			customer: {
				id: '1',
				name: 'Customer 2',
				phone: '01000000000',
				mobile: '01000000000',
				classification: {
					id: 1,
					title: 'cool',
					color: 'blue',
				},
			},
			products: [
				{
					id: 1,
					productVariant: {
						id: 1,
						title: 'Product 1',
						price: 10,
					},
					quantity: 1,
					price: 10,
					totalPrice: 412,
					note: 'note',
				},
				{
					id: 2,
					productVariant: {
						id: 2,
						title: 'Product 2',
						price: 20,
					},
					quantity: 1,
					price: 10,
					totalPrice: 23,
					note: 'note',
				},
			],
		},
		{
			id: 3,
			branchDateFlag: 3,
			netPrice: 1000,
			invoiceTax: 12,
			preparationNotes: 'preparationNotes',
			employeeNote: 'employeeNote',
			clientNote: 'clientNote',
			invoiceType: 'sales',
			customer: {
				id: '1',
				name: 'Customer 3',
				phone: '01000000000',
				mobile: '01000000000',
				classification: {
					id: 1,
					title: 'danger',
					color: 'red',
				},
			},
			products: [
				{
					id: 1,
					productVariant: {
						id: 1,
						title: 'Product 1',
						price: 10,
					},
					quantity: 1,
					price: 10,
					totalPrice: 412,
					note: 'note',
				},
				{
					id: 2,
					productVariant: {
						id: 2,
						title: 'Product 2',
						price: 20,
					},
					quantity: 1,
					price: 10,
					totalPrice: 23,
					note: 'note',
				},
				{
					id: 3,
					productVariant: {
						id: 3,
						title: 'Product 3',
						price: 30,
					},
					quantity: 1,
					price: 10,
					totalPrice: 20,
					note: 'note',
				},
				{
					id: 4,
					productVariant: {
						id: 4,
						title: 'Product 4',
						price: 40,
					},
					quantity: 1,
					price: 10,
					totalPrice: 242,
					note: 'note',
				},
			],
		},
	];

	customers = [
		{
			id: '1',
			name: 'tomas',
			country: {
				name: 'Colombia',
				code: 'CO',
			},
			representative: {
				name: 'Tomas',
				image: 'tomas.png',
			},
			status: 'unqualified',
		},
		{
			id: '2',
			name: 'jose',
			country: {
				name: 'Colombia',
				code: 'CO',
			},
			representative: {
				name: 'jose',
				image: 'jose.png',
			},
			status: 'new',
		},
		{
			id: '3',
			name: 'pedro',
			country: {
				name: 'Colombia',
				code: 'CO',
			},
			representative: {
				name: 'pedro',
				image: 'pedro.png',
			},
			status: 'qualified',
		},
	];

	selectedInvoice?: Invoice;

	idxStore = inject(invoiceIndexStore);

	onRowSelect(invoice: Invoice) {
		if (this.selectedInvoice)
			this.idxStore.selectInvoices([this.selectedInvoice]);
	}
}
