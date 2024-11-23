import {
	Component,
	AfterViewInit,
	OnDestroy,
	ChangeDetectorRef,
	ViewChild,
	ElementRef,
	effect,
	inject,
	input,
	WritableSignal,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { CategoryIntersectionObserver } from './category-intersection-observer';
import { productStore } from '@src/app/features/products';

@Component({
	selector: 'app-mobil-category-bar',
	standalone: true,
	templateUrl: './mobil-category-bar.component.html',
	styleUrls: ['./mobil-category-bar.component.scss'],
})
export class MobilCategoryBarComponent implements AfterViewInit, OnDestroy {
	private cdr = inject(ChangeDetectorRef);
	private scrollService = inject(ScrollService);
	productStore = inject(productStore);

	categoriesViewInit = input.required<WritableSignal<boolean>>();

	menu = this.productStore.categories;

	activeCategoryId: string = 'category-57'; // Default active category
	observer = new CategoryIntersectionObserver();

	@ViewChild('tabContainer', { static: false }) tabContainer!: ElementRef;

	private readonly SCROLL_DELAY = 300; // Delay between tab activations
	private readonly OBSERVER_REENABLE_DELAY = 500; // Delay before re-enabling observer

	ngAfterViewInit(): void {
		// this.observer.initializeObserver();
	}
	_ = effect(() => {
		if (!this.categoriesViewInit()()) return;
		this.observer.initializeObserver();
	});

	ngOnDestroy(): void {
		this.observer.disconnectObserver();
	}

	/**
	 * Scrolls to a specific category by activating tabs sequentially.
	 */
	async scrollToCategory(categoryId: string) {
		this.observer.isScrolling = true;

		const tabsToHighlight = this.getTabsToHighlight(categoryId);
		for (const tabId of tabsToHighlight) {
			await this.activateTab(tabId, tabId === categoryId);
		}

		this.reenableObserverAfterDelay();
	}

	/**
	 * Updates the active category and ensures the tab is visible.
	 */
	__ = effect(() => {
		this.activeCategoryId = this.observer.activeEntryId();
		this.cdr.detectChanges();
		this.scrollActiveTabIntoView();
	});

	/**
	 * Sequentially activates a tab with an optional smooth scroll to the section.
	 */
	private async activateTab(tabId: string, isLastTab: boolean) {
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				this.activeCategoryId = tabId;
				this.cdr.detectChanges();
				this.scrollActiveTabIntoView();

				if (isLastTab) this.scrollCategoryIntoView(+tabId); // TODO Fix
				resolve();
			}, this.SCROLL_DELAY);
		});
	}

	/**
	 * Scrolls the corresponding category section into view.
	 */
	private scrollCategoryIntoView(categoryIdx: number) {
		const section = document.getElementById(categoryIdx.toString()); // TODO Fix
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
			this.scrollService.inViewCategory.set(categoryIdx);
		}
	}

	/**
	 * Scrolls the active tab into view within the tab container.
	 */
	private scrollActiveTabIntoView() {
		const activeTab = document.getElementById(
			`tab-${this.activeCategoryId}`,
		);
		if (activeTab) {
			activeTab.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		}
	}

	/**
	 * Determines the sequence of tabs to highlight during scrolling.
	 */
	private getTabsToHighlight(targetCategoryId: string): string[] {
		const currentTabIndex = parseInt(
			this.activeCategoryId.replace('category-', ''),
		);
		const targetTabIndex = parseInt(
			targetCategoryId.replace('category-', ''),
		);

		const tabsToHighlight: string[] = [];
		const step = currentTabIndex < targetTabIndex ? 1 : -1;

		for (
			let i = currentTabIndex + step;
			i !== targetTabIndex + step;
			i += step
		) {
			tabsToHighlight.push(`category-${i}`);
		}

		return tabsToHighlight;
	}

	/**
	 * Re-enables the observer after a delay to avoid interference.
	 */
	private reenableObserverAfterDelay() {
		setTimeout(
			() => (this.observer.isScrolling = false),
			this.OBSERVER_REENABLE_DELAY,
		);
	}
}
