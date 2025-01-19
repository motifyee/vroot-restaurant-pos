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
import { TopbarComponent } from '../../../../components/topbar/topbar.component';
import { productsPageStore } from '../../products-page.store';
import { SkeletonModule } from 'primeng/skeleton';
import { settingsStore, menuStore } from '@webstore/state';
import { BannerComponent } from '../banner/banner.component';
import { IS_DEVMODE } from '@src/app/core';

@Component({
	selector: 'product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TopbarComponent],
	imports: [SkeletonModule, BannerComponent],
})
export class ProductListComponent
	implements OnInit, AfterViewChecked, OnDestroy
{
	private cdr = inject(ChangeDetectorRef);
	private scrollSubscription!: Subscription;
	private scrollService = inject(ScrollService);
	settings = inject(settingsStore);
	menuStore = inject(menuStore);
	productsPageStore = inject(productsPageStore);

	scrollHookTop = this.scrollService.scrollHookTop;
	@ViewChild('scrollHook') public scrollHook?: ElementRef;
	@ViewChildren('category') categoriesElements?: QueryList<
		ElementRef<HTMLElement>
	>;

	menu = this.menuStore.menu;

	ngOnInit() {
		if (IS_DEVMODE) {
			const products = localStorage.getItem('products');
			if (products) {
				this.menuStore.setMenu(JSON.parse(products));
				return;
			}
		}

		const branchId = this.settings.selectedBranch?.()?.id;
		if (!branchId) return;

		this.menuStore.getMenu(branchId).subscribe((m) => {
			IS_DEVMODE && localStorage.setItem('products', JSON.stringify(m));
		});
	}

	// ###########################################################################

	//  trigger ngAfterViewChecked on menu change
	_ = effect(() => {
		this.menu();
		this.cdr.markForCheck();
	});
	ngAfterViewChecked(): void {
		if (!this.menu().length) return;

		this.productsPageStore.setCategoriesViewInit();
	}

	// ###########################################################################

	//  scroll to active category on inViewCategory change
	__ = effect(() => {
		const selectedCategoryId = this.scrollService.tappedCategoryId();

		if (selectedCategoryId) this.scrollToCategory(selectedCategoryId);
	});

	// Scroll to a category
	private scrollToCategory(categoryId: string | number) {
		const category = this.categoriesElements?.find(
			(c) => c.nativeElement.id === 'category-' + categoryId,
		)?.nativeElement;

		if (!category) return;
		const categoryOffset = category.offsetTop;

		const scrollHook = this.scrollHook?.nativeElement as HTMLElement,
			hookRect = scrollHook.getBoundingClientRect(),
			distanceToTop = hookRect.top - this.scrollHookTop();

		const offset = categoryOffset - hookRect.bottom + distanceToTop;

		window.scrollTo({ top: offset, behavior: 'smooth' });
	}

	// ###########################################################################

	ngOnDestroy() {
		this.scrollSubscription?.unsubscribe(); // Cleanup subscription
	}
}
