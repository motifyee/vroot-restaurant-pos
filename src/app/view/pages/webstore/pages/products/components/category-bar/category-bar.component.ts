import { Component, inject } from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service';
import { productStore } from '@src/app/features/products';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'category-bar',
	standalone: true,
	imports: [SkeletonModule],
	templateUrl: './category-bar.component.html',
	styleUrls: ['./category-bar.component.scss'],
})
export class CategoryBarComponent {
	private productStore = inject(productStore);
	private scrollService = inject(ScrollService);

	activeCategoryId: string | null = null;

	menu = this.productStore.categories;

	scrollToCategory(categoryIdx: string) {
		this.activeCategoryId = categoryIdx; // Set active category
		this.scrollService.tappedCategoryId.set(categoryIdx);
	}
}
