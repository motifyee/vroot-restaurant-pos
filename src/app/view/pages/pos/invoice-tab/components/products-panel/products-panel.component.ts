import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	Signal,
	signal,
	ViewChild,
} from '@angular/core';
import {
	InvoiceStore,
	invoiceStore,
} from '@src/app/features/invoices/state/invoice/invoice.store';
import { appStore } from '@src/app/view/state/app/app.store';
import { InvoiceTab } from '@src/app/view/state/app/models/invoice-tab.model';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'products-panel',
    imports: [DividerModule, ButtonModule, InputTextModule],
    templateUrl: './products-panel.component.html',
    styleUrl: './products-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPanelComponent {
	// invoiceStore = inject(invoiceStore);

	appStore = inject(appStore);
	tab = this.appStore.activeTab as Signal<InvoiceTab>;

	products: ProductVariant[] = [
		{
			id: 1,
			title: 'Product 1',
			price: 100,
		},
		{
			id: 2,
			title: 'Product 2',
			price: 200,
		},
		{
			id: 3,
			title: 'Product 3',
			price: 300,
		},
		{
			id: 4,
			title: 'Product 4',
			price: 400,
		},
		{
			id: 5,
			title: 'Product 5',
			price: 500,
		},
		{
			id: 6,
			title: 'Product 6',
			price: 600,
		},
		{
			id: 7,
			title: 'Product 7',
			price: 700,
		},
		{
			id: 8,
			title: 'Product 8',
			price: 800,
		},
		{
			id: 9,
			title: 'Product 9',
			price: 900,
		},
		{
			id: 10,
			title: 'Product 10',
			price: 1000,
		},
		{
			id: 11,
			title: 'Product 11',
			price: 1100,
		},
		{
			id: 12,
			title: 'Product 12',
			price: 1200,
		},
		{
			id: 13,
			title: 'Product 13',
			price: 1300,
		},
		{
			id: 14,
			title: 'Product 14',
			price: 1400,
		},
		{
			id: 15,
			title: 'Product 15',
			price: 1500,
		},
	];

	categories: Category[] = [
		{
			id: 1,
			sn: 1,
			title: 'Category 1',
			products: [],
		},
		{
			id: 2,
			sn: 2,
			title: 'Category 2',
			products: [],
		},
		{
			id: 3,
			sn: 3,
			title: 'Category 3',
			products: [],
		},
		{
			id: 4,
			sn: 4,
			title: 'Category 4',
			products: [],
		},
		{
			id: 5,
			sn: 5,
			title: 'Category 5',
			products: [],
		},
		{
			id: 6,
			sn: 6,
			title: 'Category 6',
			products: [],
		},
		{
			id: 7,
			sn: 7,
			title: 'Category 7',
			products: [],
		},
		{
			id: 8,
			sn: 8,
			title: 'Category 8',
			products: [],
		},
		{
			id: 9,
			sn: 9,
			title: 'Category 9',
			products: [],
		},
		{
			id: 10,
			sn: 10,
			title: 'Category 10',
			products: [],
		},
	];

	selectedCategoryId = signal<number>(1);

	addProduct(variant: ProductVariant, quantity = 1) {
		// this.invoiceStore.addProduct(variant, quantity);
		this.tab().addProduct(variant, quantity);
	}

	@ViewChild('searchInput') searchInput!: ElementRef;
	searchIsExpanded = signal(false);
	searchInputVisible = signal(false);
	async expandSearch() {
		this.searchIsExpanded.set(true);
		this.searchInputVisible.set(true);

		while (!this.searchInput)
			await new Promise((resolve) => setTimeout(resolve, 10));

		this.searchInput?.nativeElement.focus();
	}
	async shrinkSearch() {
		this.searchIsExpanded.set(false);

		await new Promise((resolve) => setTimeout(resolve, 200)); // duration of animation
		return this.searchInputVisible.set(false);
	}
}
