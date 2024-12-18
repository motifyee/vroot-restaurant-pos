import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	signal,
} from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service';
import { menuStore } from '@webstore/state';
import { SkeletonModule } from 'primeng/skeleton';
import { CategoryIntersectionObserver } from '../mobile-category-bar/category-intersection-observer';
import { productsPageStore } from '../../products-page.store';

@Component({
	selector: 'category-bar',
	standalone: true,
	imports: [SkeletonModule],
	templateUrl: './category-bar.component.html',
	styleUrls: ['./category-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryBarComponent {
	private menuStore = inject(menuStore);
	private scrollService = inject(ScrollService);
	productsPageStore = inject(productsPageStore);

	observer = new CategoryIntersectionObserver();

	activeCategoryId = signal<number>(-1);

	private readonly OBSERVER_REENABLE_DELAY = 800; // Delay before re-enabling observer

	menu = this.menuStore.categories;

	scrollToCategory(categoryIdx: number) {
		this.activeCategoryId.set(categoryIdx); // Set active category
		this.scrollService.tappedCategoryId.set(categoryIdx);

		this.observer.skipIntersections = true;
		setTimeout(() => {
			this.observer.skipIntersections = false;
		}, this.OBSERVER_REENABLE_DELAY);
	}

	// delay observer initialization until `products-page.component` ensures the categories has been initialized to view
	_ = effect(() => {
		if (!this.productsPageStore.categoriesViewHasInit()) return;

		this.observer.initializeObserver('.category-section[category-id]');
	});

	ngOnDestroy(): void {
		this.observer.disconnectObserver();
	}

	// Scrolls active category-tab into view
	// on category-section intersection
	__ = effect(
		() => {
			const categoryId = this.observer.intersectingCategoryId(),
				tabId = `category-tab-${categoryId}`,
				activeTab = document.getElementById(tabId);

			if (!activeTab) return;

			this.activeCategoryId.set(categoryId);

			// activeTab.scrollIntoView({
			// 	behavior: 'smooth',
			// 	block: 'nearest',
			// 	inline: 'center',
			// });
		},
		{ allowSignalWrites: true },
	);
}
