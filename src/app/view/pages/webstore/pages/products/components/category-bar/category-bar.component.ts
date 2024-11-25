import { Component, inject } from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service';
import { productStore } from '@src/app/features/products';

@Component({
	selector: 'category-bar',
	standalone: true,
	imports: [],
	templateUrl: './category-bar.component.html',
	styleUrls: ['./category-bar.component.scss'],
})
export class CategoryBarComponent {
	private productStore = inject(productStore);
	private scrollService = inject(ScrollService);

	activeCategoryIdx: number | null = null;

	menu = this.productStore.categories;

	scrollToCategory(categoryIdx: number) {
		this.activeCategoryIdx = categoryIdx; // Set active category
		this.scrollService.inViewCategory.set(categoryIdx);
	}
}
