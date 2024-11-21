import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ItemsComponent } from './components/items/items.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { AddToCartItemModalComponent } from './components/add-to-cart-item-modal/add-to-cart-item-modal.component';
import { MobilCategoryBarComponent } from './components/mobil-category-bar/mobil-category-bar.component';

@Component({
	selector: 'shop',
	standalone: true,
	imports: [
		HeaderComponent,
		CartComponent,
		CategoryBarComponent,
		ItemsComponent,
		NavbarComponent,
		BannerComponent,
		AddToCartItemModalComponent,
		MobilCategoryBarComponent,
	],
	templateUrl: './webstore.component.html',
	styleUrls: ['./webstore.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
	isSideBarVisible = signal(false);
	isOrderDetailsVisible = signal(false);

	// Toggle sidebar visibility
	toggleChildTwoVisibility() {
		this.isSideBarVisible.update((value) => !value);
	}

	// Toggle order details visibility
	toggleOrderDetailsVisibility() {
		this.isOrderDetailsVisible.update((value) => !value);
	}
}
