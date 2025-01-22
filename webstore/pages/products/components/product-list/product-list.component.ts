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
	Injector,
	signal,
} from '@angular/core';
import { ScrollService } from '../../../../services/scroll.service'; // Import your scroll service
import { Subscription } from 'rxjs';
import { TopbarComponent } from '../../../../components/topbar/topbar.component';
import { productsPageStore } from '../../products-page.store';
import { SkeletonModule } from 'primeng/skeleton';
import { settingsStore, menuStore, invoiceStore } from '@webstore/state';
import { BannerComponent } from '../banner/banner.component';
import { NgTemplateOutlet } from '@angular/common';
import { singleCallEffect } from '@src/app/core';
import { BranchOrderTypePickerComponent } from '@webstore/components/pick-branch-modal/pick-branch-modal.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
	selector: 'product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TopbarComponent],
	imports: [
		SkeletonModule,
		BannerComponent,
		NgTemplateOutlet,
		BranchOrderTypePickerComponent,
		ProgressSpinnerModule,
	],
})
export class ProductListComponent
	implements OnInit, AfterViewChecked, OnDestroy
{
	private scrollSubscription!: Subscription;
	private scrollService = inject(ScrollService);
	settings = inject(settingsStore);
	menuStore = inject(menuStore);
	productsPageStore = inject(productsPageStore);
	invoices = inject(invoiceStore);

	scrollHookTop = this.scrollService.scrollHookTop;
	@ViewChild('scrollHook') public scrollHook?: ElementRef;
	@ViewChildren('category') categoriesElements?: QueryList<
		ElementRef<HTMLElement>
	>;

	menu = this.menuStore.menu;

	ngOnInit() {
		const branchId = this.settings.selectedBranch?.()?.id;

		this.menuStore.getMenu(branchId).subscribe();
	}

	loadingProducts = signal<{ [key: string]: boolean }>({});

	injector = inject(Injector);
	selectInvoiceType = signal(false);
	selectProduct(product: InvoiceProduct) {
		// check if invoiceStore is loading, to delay product selection
		if (this.invoices.isLoading())
			if (this.loadingProducts()[product.productVariantId])
				// check if product is already loading, to prevent multiple calls
				return;
			else
				return singleCallEffect({
					injector: this.injector,
					init: () =>
						// set loading state
						this.loadingProducts.set({
							...this.loadingProducts(),
							[product.productVariantId]: true,
						}),
					predicate: () => !this.invoices.isLoading(),
					success: () => {
						// clear loading state
						this.loadingProducts.set({
							...this.loadingProducts(),
							[product.productVariantId]: false,
						});

						// try to select product again
						this.selectProduct(product);
					},
				});

		const invoiceTypeSelected = () =>
			!!this.invoices.activeInvoice() ||
			!!this.settings.defaultInvoiceType?.();

		// Select invoice-type before adding products
		if (!invoiceTypeSelected())
			return singleCallEffect({
				injector: this.injector,
				init: () => this.selectInvoiceType.set(true),
				predicate: invoiceTypeSelected,
				success: () => this.selectProduct(product),
			});

		this.productsPageStore.selectProduct(product);
	}

	// ###########################################################################

	//  trigger ngAfterViewChecked on menu change
	// _ = effect(() => {
	// this.menu();
	// this.cdr.markForCheck();
	// });

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
