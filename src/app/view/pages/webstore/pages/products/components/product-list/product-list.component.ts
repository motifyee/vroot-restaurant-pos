// items.component.ts
import {
	Component,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
	inject,
	effect,
	ViewChild,
	ElementRef,
	ViewChildren,
	QueryList,
	AfterViewChecked,
	ChangeDetectorRef,
} from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service'; // Import your scroll service
import { Subscription } from 'rxjs';
import { productStore } from '@src/app/features/products';
import { HeaderComponent } from '../../../../components/topbar/topbar.component';
import { productsPageStore } from '../../products-page.store';

@Component({
	selector: 'product-list',
	standalone: true,
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [HeaderComponent],
})
export class ProductListComponent
	implements OnInit, AfterViewChecked, OnDestroy
{
	private cdr = inject(ChangeDetectorRef);
	private scrollSubscription!: Subscription;
	private scrollService = inject(ScrollService);
	private productStore = inject(productStore);
	private productsPageStore = inject(productsPageStore);

	categoriesViewHasInit = this.productsPageStore.categoriesViewHasInit;

	addProduct(product: Product) {
		this.productsPageStore.selectProduct(product);
	}

	@ViewChild('scrollHook') public scrollHook?: ElementRef;
	@ViewChildren('category') categoriesElements?: QueryList<
		ElementRef<HTMLElement>
	>;

	menu = this.productStore.categories;
	products = effect(() => this.productStore.categories());

	//  trigger ngAfterViewChecked on menu change
	_ = effect(() => {
		this.menu();
		this.cdr.markForCheck();
	});

	//  scroll to active category
	__ = effect(() => {
		const idx = this.scrollService.inViewCategory();
		this.scrollToCategory(idx);
	});

	ngOnInit() {
		this.productStore.getCategories().subscribe();
	}

	ngAfterViewChecked(): void {
		if (!this.menu().length) return;
		this.productsPageStore.setCategoriesViewInit();
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

	ngOnDestroy() {
		this.scrollSubscription.unsubscribe(); // Cleanup subscription
	}
}
