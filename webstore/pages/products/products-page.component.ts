import {
	ChangeDetectionStrategy,
	Component,
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
import { AddToCartItemModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';

import { ScrollService } from '../../services/scroll.service';
import { settingsStore } from '@webstore/state';
import { BranchOrderTypePickerComponent } from '../../components/pick-branch-modal/pick-branch-modal.component';
import { IS_DEVMODE } from '@src/app/core';

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

	chooseBranch = signal(false);

	ngOnInit(): void {
		if (IS_DEVMODE && localStorage.getItem('test-branch-idx')) {
			this.settings.selectOrderType('delivery');
			this.settings.selectBranchById(
				+localStorage.getItem('test-branch-idx')!,
			);
		}

		if (!this.settings.selectedBranch?.() || !this.settings.orderType())
			this.chooseBranch.set(true);
	}
}
