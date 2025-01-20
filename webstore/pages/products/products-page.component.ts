import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MobilCategoryBarComponent } from './components/mobile-category-bar/mobile-category-bar.component';
import { CartComponent } from '../../components/cart/cart.component';
import { productsPageStore } from './products-page.store';
import { AddToCartItemModalComponent } from '../../components/add-to-cart-modal/add-to-cart-modal.component';

import { ScrollService } from '../../services/scroll.service';
import { invoiceStore, settingsStore } from '@webstore/state';
import {
	BranchOrderTypePickerComponent,
	PickBranchModalTarget,
} from '../../components/pick-branch-modal/pick-branch-modal.component';

@Component({
	selector: 'products-page',
	imports: [
		BannerComponent,
		CategoryBarComponent,
		MobilCategoryBarComponent,
		ProductListComponent,
		CartComponent,
		AddToCartItemModalComponent,
		BranchOrderTypePickerComponent,
	],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
	providers: [productsPageStore],
})
export class ProductsPageComponent implements OnInit {
	scrollService = inject(ScrollService);

	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedProduct;

	settings = inject(settingsStore);
	invoices = inject(invoiceStore);

	chooseBranch = signal(false);
	branchOrderType = computed<PickBranchModalTarget | null>(() => {
		if (
			!this.settings.selectedBranch?.() &&
			!this.settings.defaultOrderType()
		)
			return 'all';

		if (!this.settings.selectedBranch?.()) return 'branch';
		if (!this.settings.defaultOrderType()) return 'orderType';

		return null;
	});

	ngOnInit(): void {
		if (this.branchOrderType()) this.chooseBranch.set(true);

		this.invoices.loadActiveInvoice();
	}
}
