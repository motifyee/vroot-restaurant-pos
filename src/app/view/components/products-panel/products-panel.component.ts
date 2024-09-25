import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	input,
	signal,
	ViewChild,
} from '@angular/core';
import { InvoiceStore } from '@src/app/features/invoices/state/invoice/invoice.store';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'products-panel',
	standalone: true,
	imports: [DividerModule, ButtonModule, InputTextModule],
	templateUrl: './products-panel.component.html',
	styleUrl: './products-panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPanelComponent {
	products = [
		{
			id: 1,
			name: 'Product 1',
			price: 100,
		},
		{
			id: 2,
			name: 'Product 2',
			price: 200,
		},
		{
			id: 3,
			name: 'Product 3',
			price: 300,
		},
		{
			id: 4,
			name: 'Product 4',
			price: 400,
		},
		{
			id: 5,
			name: 'Product 5',
			price: 500,
		},
		{
			id: 6,
			name: 'Product 6',
			price: 600,
		},
		{
			id: 7,
			name: 'Product 7',
			price: 700,
		},
		{
			id: 8,
			name: 'Product 8',
			price: 800,
		},
		{
			id: 9,
			name: 'Product 9',
			price: 900,
		},
		{
			id: 10,
			name: 'Product 10',
			price: 1000,
		},
		{
			id: 11,
			name: 'Product 11',
			price: 1100,
		},
		{
			id: 12,
			name: 'Product 12',
			price: 1200,
		},
		{
			id: 13,
			name: 'Product 13',
			price: 1300,
		},
		{
			id: 14,
			name: 'Product 14',
			price: 1400,
		},
		{
			id: 15,
			name: 'Product 15',
			price: 1500,
		},
	];

	categories = [
		{
			id: 1,
			name: 'Category 1',
		},
		{
			id: 2,
			name: 'Category 2',
		},
		{
			id: 3,
			name: 'Category 3',
		},
		{
			id: 4,
			name: 'Category 4',
		},
		{
			id: 5,
			name: 'Category 5',
		},
		{
			id: 6,
			name: 'Category 6',
		},
		{
			id: 7,
			name: 'Category 7',
		},
		{
			id: 8,
			name: 'Category 8',
		},
		{
			id: 9,
			name: 'Category 9',
		},
		{
			id: 10,
			name: 'Category 10',
		},
	];

	selectedCategory = signal<number>(1);
	notify(id: number) {
		this.selectedCategory.set(id);
		console.log(this.selectedCategory());
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
