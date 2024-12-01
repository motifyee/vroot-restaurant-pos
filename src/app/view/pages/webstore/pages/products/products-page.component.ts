import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MobilCategoryBarComponent } from './components/mobile-category-bar/mobile-category-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { productsPageStore } from './products-page.store';
import { AddToCartItemModalComponent } from './components/add-to-cart-modal/add-to-cart-modal.component';
import {
	animate,
	keyframes,
	style,
	transition,
	trigger,
} from '@angular/animations';

// const visible = style({ opacity: 1, transform: 'scale(1) translateY(0)' });
// const hidden = style({ opacity: 0, transform: 'scale(0) translateY(-100%)' });

const visible = style({ opacity: 1, transform: 'scale(1) translateY(0)' });
const hidden = style({ opacity: 0, transform: 'scale(0.5) translateY(-50%)' });

const timing = '300ms ease-in-out';
const _keyframes = keyframes([
	style({
		opacity: 0,
		transform: 'scale(0) translateY(-100%)',
		offset: 0,
	}),
	style({
		opacity: 1,
		transform: 'scale(1) translateY(0)',
		offset: 1,
	}),
]);
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
	animations: [
		trigger('scaleInOut', [
			transition(':enter', [hidden, animate(timing, visible)]),
			transition(':leave', [visible, animate(timing, hidden)]),
		]),
	],
})
export class ProductsPageComponent {
	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedProduct;
}
