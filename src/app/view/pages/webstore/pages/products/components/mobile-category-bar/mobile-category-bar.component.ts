import {
	Component,
	AfterViewInit,
	OnDestroy,
	ViewChild,
	ElementRef,
	effect,
	inject,
	signal,
} from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service';
import { CategoryIntersectionObserver } from './category-intersection-observer';
import { productStore } from '@src/app/features/products';
import { productsPageStore } from '../../products-page.store';

@Component({
	selector: 'mobile-category-bar',
	standalone: true,
	templateUrl: './mobile-category-bar.component.html',
	styleUrls: ['./mobile-category-bar.component.scss'],
})
export class MobilCategoryBarComponent implements AfterViewInit, OnDestroy {
	scrollService = inject(ScrollService);
	productStore = inject(productStore);
	productsPageStore = inject(productsPageStore);

	menu = this.productStore.categories;

	observer = new CategoryIntersectionObserver();

	activeCategoryId = signal<number>(-1);

	@ViewChild('container') container: ElementRef<HTMLElement> | undefined;

	private readonly SCROLL_DELAY = 300; // Delay between tab activations
	private readonly OBSERVER_REENABLE_DELAY = 800; // Delay before re-enabling observer

	ngAfterViewInit(): void {
		if (!this.container) return;

		this.scrollService.mobileCategoriesEl.set(this.container.nativeElement);
	}

	// delay observer initialization until `products-page.component` ensures the categories has been initialized to view
	_ = effect(() => {
		if (!this.productsPageStore.categoriesViewHasInit()) return;

		this.observer.initializeObserver('.category-section');
	});

	ngOnDestroy(): void {
		this.observer.disconnectObserver();
	}

	//  on category-tab click
	scrollToCategory(categoryId: number) {
		this.scrollService.tappedCategoryId.set(categoryId);
		this.activeCategoryId.set(categoryId);

		this.observer.skipIntersections = true;
		setTimeout(() => {
			this.observer.skipIntersections = false;
		}, this.OBSERVER_REENABLE_DELAY);
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

			activeTab.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		},
		{ allowSignalWrites: true },
	);
}
