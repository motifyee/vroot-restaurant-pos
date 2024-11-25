import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	OnInit,
	signal,
	Signal,
	ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '@src/app/features';
import { InvoiceProduct } from '@src/app/features/invoices/domain/models/invoice-product.model';
import { appStore } from '@src/app/view/state/app/app.store';
import { InvoiceTab } from '@src/app/view/state/app/models/invoice-tab.model';
import { ScrollerOptions } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import {
	Dropdown,
	DropdownChangeEvent,
	DropdownFilterEvent,
	DropdownFilterOptions,
	DropdownModule,
} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AddCustomerPopupComponent } from './customer-popup/customer-popup.component';
import { EditProductPopupComponent } from './edit-product-popup/edit-product-popup.component';

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
		SkeletonModule,
		ListboxModule,
		ToggleButtonModule,
		AddCustomerPopupComponent,
		EditProductPopupComponent,
	],
	templateUrl: './invoice-panel.component.html',
	styleUrl: './invoice-panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePanelComponent implements OnInit {
	productPopupVisible = false;
	customerPopupVisible = signal(true);

	emptyCustomer: Customer = {
		id: '',
		name: '',
		classification: { id: 12, color: 'cls', title: 'cool' },
		phone: '',
		mobile: '',
		addresses: [],
	};

	editCust() {}

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

	selectedCustomer?: Customer;
	selectedInvoiceType?: Customer;
	selectedBranch?: Customer;

	scrollOptions: ScrollerOptions = {
		// delay: 250,
		showLoader: false,
		lazy: true,
		onLazyLoad: this.onLazyLoad.bind(this),
		scrollHeight: '300px',
		step: 20,
		showSpacer: true,
	};
	customers: Customer[] = [];
	items: any[] = [];
	constructor() {
		for (let i = 0; i < 10000; i++) {
			this.customers.push({
				id: 'Id' + i,
				name: 'Customer ' + i,
				classification: { id: 12, color: 'cls', title: 'cool' },
			});
			this.items.push({});
		}
	}
	ngOnInit(): void {}

	loadLazyTimeout: any = null;
	loading = false;

	onLazyLoad(event: any) {
		this.loading = true;

		if (this.loadLazyTimeout) {
			clearTimeout(this.loadLazyTimeout);
		}
		//imitate delay of a backend call
		this.loadLazyTimeout = setTimeout(
			() => {
				const { first, last } = event;
				// const items = [...this.items];

				for (let i = first; i < last; i++) {
					this.items[i] = {
						...this.customers[i],
					};
				}

				// this.items = items;
				this.loading = false;
			},
			Math.random() * 1000 + 250,
		);
	}

	onCustomersFilter(event: DropdownFilterEvent) {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo purposes we filter at client side
		const filtered: any[] = [];
		const query = event.filter;
		for (let i = 0; i < this.customers.length; i++) {
			const item = this.customers[i];
			if (item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
				filtered.push(item);
			}
		}

		this.items = filtered;
	}
	onCustomerChange(event: DropdownChangeEvent) {
		this.activeTab().setCustomer(event.value);
	}
	onSalesInvoiceTypeChange(event: DropdownChangeEvent) {
		this.activeTab().setSalesInvoiceType(event.value);
	}
	onToBranchIdChange(event: DropdownChangeEvent) {
		this.activeTab().setToBranchId(event.value);
	}

	filterValue = signal<string>('');
	resetFunction(event: MouseEvent, options: DropdownFilterOptions) {
		options?.reset?.();
		options?.filter?.(event);
		this.filterValue.set('');
	}
	@ViewChild('customFilterInput')
	customFilterInput?: ElementRef<HTMLInputElement>;
	@ViewChild('customerDropdown') customerDropdown?: ElementRef<Dropdown>;
	onShow(evt: any) {
		this.filterValue.set('');

		setTimeout(() =>
			(this.customFilterInput?.nativeElement as HTMLInputElement).focus(),
		);
	}
	onHide(evt: any) {
		this.customFilterInput?.nativeElement?.blur();
		this.customerDropdown?.nativeElement!;
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
