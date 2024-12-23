// scroll.service.ts
import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class ScrollService {
	headerEl = signal<HTMLElement | null>(null);
	mobileCategoriesEl = signal<HTMLElement | null>(null);

	scrollHookTop = computed(() => {
		const headerHeight = this.headerEl()?.offsetHeight || 0;

		const mobileCategoriesHeight =
			this.mobileCategoriesEl()?.offsetHeight || 0;

		return headerHeight + mobileCategoriesHeight + 20;
	});

	// ###########################################################################

	//  set when a category-tab is clickecd
	tappedCategoryId = signal<string | number>('', {
		equal: () => false, // to always react to updates whether changed or not
	});

	// ###########################################################################

	isMobileView = signal(window.innerWidth <= 750);
	isTabletView = signal(window.innerWidth <= 1000 && window.innerWidth > 750);
	isWideScreen = signal(window.innerWidth > 1000);
}
