import { ChangeDetectionStrategy, Component ,signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemsComponent } from './components/items/items.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { PickupComponent } from "./components/order-options/pickup/pickup.component";
import { DeliveryComponent } from "./components/order-options/delivery/delivery.component";
import { DriveComponent } from "./components/order-options/drive/drive.component";
import { AddToCartItemModalComponent } from "./components/add-to-cart-item-modal/add-to-cart-item-modal.component";
import { MobilCategoryBarComponent } from "./components/mobil-category-bar/mobil-category-bar.component";
import { OrderOptionComponent } from "./components/order-options/order-option/order-option.component";




@Component({
  selector: 'shop',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CartComponent, CategoryBarComponent, FooterComponent, ItemsComponent, NavbarComponent, BannerComponent, PickupComponent, AddToCartItemModalComponent, MobilCategoryBarComponent, OrderOptionComponent, DeliveryComponent, DriveComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {
	isSideBarVisible = signal(false);
	isOrderDetailsVisible = signal(false);

	// Toggle sidebar visibility
	toggleChildTwoVisibility() {
	  this.isSideBarVisible.update(value => !value);
	}

	// Toggle order details visibility
	toggleOrderDetailsVisibility() {
	  this.isOrderDetailsVisible.update(value => !value);
	}
  }







