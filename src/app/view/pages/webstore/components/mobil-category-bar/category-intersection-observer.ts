import { signal } from '@angular/core';

export class CategoryIntersectionObserver {
	private observer!: IntersectionObserver;
	isScrolling: boolean = false;
	activeEntryId = signal('');
	/**
	 * Creates and initializes the IntersectionObserver for active category tracking.
	 */
	initializeObserver() {
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
	disconnectObserver() {
		this.observer?.disconnect();
	}

	/**
	 * Handles intersection changes for category sections.
	 */
	private handleIntersection(entries: IntersectionObserverEntry[]) {
		if (this.isScrolling) return;

		for (const entry of entries)
			if (entry.isIntersecting) {
				this.activeEntryId.set(entry.target.id);
				break;
			}
	}

	/**
	 * Observes all category sections for the IntersectionObserver.
	 */
	private observeCategorySections() {
		const sections = document.querySelectorAll('.category-section');
		sections.forEach((section) => this.observer.observe(section));
	}
}
