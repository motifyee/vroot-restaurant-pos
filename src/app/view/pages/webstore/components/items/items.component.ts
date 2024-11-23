// items.component.ts
import {
	Component,
	OnInit,
	OnDestroy,
	Input,
	ChangeDetectionStrategy,
	inject,
	effect,
	ViewChild,
	ElementRef,
	viewChildren,
	ViewChildren,
	QueryList,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service'; // Import your scroll service
import { Subscription } from 'rxjs';
import { productStore } from '@src/app/features/products';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-items',
	standalone: true,
	templateUrl: './items.component.html',
	styleUrls: ['./items.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [HeaderComponent],
})
export class ItemsComponent implements OnInit, OnDestroy {
	// private injector;
	private scrollSubscription!: Subscription;
	private scrollService = inject(ScrollService);
	private productStore = inject(productStore);

	@ViewChild('scrollHook') public scrollHook?: ElementRef;
	@ViewChildren('category') categoriesElements?: QueryList<
		ElementRef<HTMLElement>
	>;

	menu = this.productStore.categories;
	products = effect(() => this.productStore.categories());

	_ = effect(() => {
		const idx = this.scrollService.inViewCategory();
		this.scrollToCategory(idx);
	});

	ngOnInit() {
		this.productStore.getCategories().subscribe();
	}

	// Scroll to a category
	private scrollToCategory(categoryIdx: number) {
		const category =
			this.categoriesElements?.get(categoryIdx)?.nativeElement;
		if (!category) return;
		const categoryOffset = category.offsetTop;

		const headerHeight =
			this.scrollService.headerEl?.getBoundingClientRect().height ?? 0;

		const scrollHook = this.scrollHook?.nativeElement as HTMLElement,
			hookRect = scrollHook.getBoundingClientRect(),
			scrollHookTop = hookRect.top + hookRect.height,
			distanceToHeader = hookRect.top - headerHeight;

		const offset = categoryOffset - scrollHookTop + distanceToHeader;

		window.scrollTo({ top: offset, behavior: 'smooth' });
	}
	oo(categoryId: string) {
		const element = document.getElementById(categoryId);
		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			const baseOffset = window.innerWidth < 768 ? 50 : 125; // Adjust offset for mobile/tablet
			const offsetPosition = Math.max(
				elementPosition - baseOffset - 100,
				0,
			); // Add extra offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	}

	@Input() toggleVisibility!: () => void; // Function to toggle visibility of ChildTwo
	onButtonClick() {
		this.toggleVisibility(); // Call the parent's toggle method when button is clicked
		console.log('details');
	}

	ngOnDestroy() {
		this.scrollSubscription.unsubscribe(); // Cleanup subscription
	}
}
