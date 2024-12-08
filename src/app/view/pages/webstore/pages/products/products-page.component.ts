import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	inject,
	signal,
} from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MobilCategoryBarComponent } from './components/mobile-category-bar/mobile-category-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { productsPageStore } from './products-page.store';
import { AddToCartItemModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';

import { scaleInOut } from '../../animations/scaleInOut.animation';

@Component({
	selector: 'products-page',
	standalone: true,
	imports: [
		BannerComponent,
		CategoryBarComponent,
		MobilCategoryBarComponent,
		ProductListComponent,
		CartComponent,
		AddToCartItemModalComponent,
	],
	templateUrl: './products-page.component.html',
	styleUrl: './products-page.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
	providers: [productsPageStore],
	animations: [scaleInOut],
})
export class ProductsPageComponent {
	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedVariant;

	isNarrowWidth = signal(window.innerWidth <= 1000);

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.isNarrowWidth.set(event.target.innerWidth <= 1000);
	}
}
