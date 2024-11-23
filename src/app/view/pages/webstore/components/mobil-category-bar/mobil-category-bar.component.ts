import {
	Component,
	AfterViewInit,
	OnDestroy,
	ChangeDetectorRef,
	ViewChild,
	ElementRef,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
	selector: 'app-mobil-category-bar',
	standalone: true,
	templateUrl: './mobil-category-bar.component.html',
	styleUrls: ['./mobil-category-bar.component.scss'],
})
export class MobilCategoryBarComponent implements AfterViewInit, OnDestroy {
	activeCategoryId: string = 'category1'; // Default active category
	private observer!: IntersectionObserver;
	private isScrolling: boolean = false;

	@ViewChild('tabContainer', { static: false }) tabContainer!: ElementRef;

	private readonly SCROLL_DELAY = 300; // Delay between tab activations
	private readonly OBSERVER_REENABLE_DELAY = 500; // Delay before re-enabling observer

	constructor(
		private cdr: ChangeDetectorRef,
		private scrollService: ScrollService,
	) {}

	ngAfterViewInit(): void {
		this.initializeObserver();
	}

	ngOnDestroy(): void {
		this.disconnectObserver();
	}

	/**
	 * Scrolls to a specific category by activating tabs sequentially.
	 */
	async scrollToCategory(categoryId: string) {
		this.isScrolling = true;

		const tabsToHighlight = this.getTabsToHighlight(categoryId);
		for (const tabId of tabsToHighlight) {
			await this.activateTab(tabId, tabId === categoryId);
		}

		this.reenableObserverAfterDelay();
	}

	/**
	 * Creates and initializes the IntersectionObserver for active category tracking.
	 */
	private initializeObserver() {
		this.observer = new IntersectionObserver(
			this.handleIntersection.bind(this),
			{
				root: null,
				rootMargin: '0px 0px -10% 0px',
				threshold: 0.1,
			},
		);

		this.observeCategorySections();
	}

	/**
	 * Disconnects the IntersectionObserver.
	 */
	private disconnectObserver() {
		this.observer?.disconnect();
	}

	/**
	 * Handles intersection changes for category sections.
	 */
	private handleIntersection(entries: IntersectionObserverEntry[]) {
		if (this.isScrolling) return;

		for (const entry of entries) {
			if (entry.isIntersecting) {
				this.updateActiveCategory(entry.target.id);
				break;
			}
		}
	}

	/**
	 * Observes all category sections for the IntersectionObserver.
	 */
	private observeCategorySections() {
		const sections = document.querySelectorAll('.category-section');
		sections.forEach((section) => this.observer.observe(section));
	}

	/**
	 * Updates the active category and ensures the tab is visible.
	 */
	private updateActiveCategory(categoryId: string) {
		this.activeCategoryId = categoryId;
		this.cdr.detectChanges();
		this.scrollActiveTabIntoView();
	}

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
			this.activeCategoryId.replace('category', ''),
		);
		const targetTabIndex = parseInt(
			targetCategoryId.replace('category', ''),
		);

		const tabsToHighlight: string[] = [];
		const step = currentTabIndex < targetTabIndex ? 1 : -1;

		for (
			let i = currentTabIndex + step;
			i !== targetTabIndex + step;
			i += step
		) {
			tabsToHighlight.push(`category${i}`);
		}

		return tabsToHighlight;
	}

	/**
	 * Re-enables the observer after a delay to avoid interference.
	 */
	private reenableObserverAfterDelay() {
		setTimeout(
			() => (this.isScrolling = false),
			this.OBSERVER_REENABLE_DELAY,
		);
	}
}
