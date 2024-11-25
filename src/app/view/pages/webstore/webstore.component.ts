import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { HeaderComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ScrollService } from './services/scroll.service';
import { productsPageStore } from './pages/products/products-page.store';
import { ProductsPageComponent } from './pages/products/products-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'webstore',
	standalone: true,
	imports: [HeaderComponent, SidebarComponent, RouterOutlet],
	templateUrl: './webstore.component.html',
	styleUrls: ['./webstore.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ScrollService, productsPageStore],
})
export class WebstoreComponent {
	isSideBarVisible = signal(false);
	isOrderDetailsVisible = signal<Product | undefined>(undefined);

	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedProduct;

	categoriesViewInit = signal(false);

	// Toggle sidebar visibility
	toggleChildTwoVisibility() {
		this.isSideBarVisible.update((value) => !value);
	}
}
