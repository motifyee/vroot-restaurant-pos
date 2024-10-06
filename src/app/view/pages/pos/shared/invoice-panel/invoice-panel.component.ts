import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	Signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceProduct } from '@src/app/features/invoices/domain/models/invoice-product.model';
import { appStore } from '@src/app/view/state/app/app.store';
import { InvoiceTab } from '@src/app/view/state/app/models/invoice-tab.model';
import { ScrollerOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'invoice-panel',
	standalone: true,
	imports: [
		CardModule,
		DividerModule,
		TableModule,
		ButtonModule,
		DialogModule,
		InputTextModule,
		DropdownModule,
		FormsModule,
	],
	templateUrl: './invoice-panel.component.html',
	styleUrl: './invoice-panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePanelComponent {
	visible = false;

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

	selectedItem: any;
	options: ScrollerOptions = {
		delay: 250,
		showLoader: true,
		lazy: true,
		onLazyLoad: this.onLazyLoad.bind(this),
		scrollHeight: '300px',
		step: 20,
		showSpacer: true,
	};
	items: any[] = [];
	_items: any[] = [];
	constructor() {
		for (let i = 0; i < 10000; i++) {
			this._items.push({ label: 'Item ' + i, value: 'Item ' + i });
			this.items.push({ label: '___' + i, value: 'Item ' + i });
		}
	}

	loadLazyTimeout: any = null;
	loading = false;

	onLazyLoad(event: any) {
		this.loading = true;

		if (this.loadLazyTimeout) {
			clearTimeout(this.loadLazyTimeout);
		}
		//imitate delay of a backend call
		this.loadLazyTimeout = setTimeout(() => {
			const { first, last } = event;
			// const items = [...this.items];

			for (let i = first; i < last; i++) {
				this.items[i] = this._items[i]; //{ label: `Item #${i}`, value: i };
			}

			// this.items = items;
			this.loading = false;
		}, Math.random() * 1000 + 250);
	}

	products = input.required<InvoiceProduct[]>();
	readonly = input<boolean>(false);

	appStore = inject(appStore);
	activeTab = this.appStore.activeTab as Signal<InvoiceTab>;

	removeProduct(id: number) {
		this.activeTab().removeProduct(id);
	}
	updateProduct(product: InvoiceProduct) {
		this.activeTab().updateProduct(product);
	}
}
