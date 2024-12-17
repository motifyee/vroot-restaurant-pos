import { Component, inject } from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service';
import { menuStore } from '@webstore/state';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'category-bar',
	standalone: true,
	imports: [SkeletonModule],
	templateUrl: './category-bar.component.html',
	styleUrls: ['./category-bar.component.scss'],
})
export class CategoryBarComponent {
	private menuStore = inject(menuStore);
	private scrollService = inject(ScrollService);

	activeCategoryId: string | null = null;

	menu = this.menuStore.categories;

	scrollToCategory(categoryIdx: string) {
		this.activeCategoryId = categoryIdx; // Set active category
		this.scrollService.tappedCategoryId.set(categoryIdx);
	}
}
