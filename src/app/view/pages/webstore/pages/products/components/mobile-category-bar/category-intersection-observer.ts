import { signal } from '@angular/core';

export class CategoryIntersectionObserver {
	private observer!: IntersectionObserver;
	skipIntersections: boolean = false;
	intersectingCategoryId = signal<number>(-1);

	// Creates and initializes the IntersectionObserver for active category tracking.
	// should be called after view init
	initializeObserver(selector: string) {
		this.observer = new IntersectionObserver(
			this.handleIntersection.bind(this),
			{
				root: null,
				rootMargin: '0px 0px -10% 0px',
				threshold: 0.1,
			},
		);

		const sections = document.querySelectorAll(selector);
		sections.forEach((section) => this.observer.observe(section));
	}

	//  should be called on destroy
	disconnectObserver() {
		this.observer?.disconnect();
	}

	// Handles intersection changes for category sections.
	private handleIntersection(entries: IntersectionObserverEntry[]) {
		if (this.skipIntersections) return;

		const entry = entries.find((entry) => entry.isIntersecting);
		if (!entry) return;

		const categoryId = +(entry.target.getAttribute('category-id') || -1);
		this.intersectingCategoryId.set(categoryId);
	}
}
