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
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, _ } from '@ngx-translate/core';
import { webstorePageStore } from './webstore.store';

@Component({
	selector: 'webstore',
	standalone: true,
	imports: [HeaderComponent, SidebarComponent, RouterOutlet, TranslatePipe],
	templateUrl: './webstore.component.html',
	styleUrls: ['./webstore.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ScrollService, productsPageStore, webstorePageStore],
})
export class WebstoreComponent {
	isSideBarVisible = signal(false);
	isOrderDetailsVisible = signal<Product | undefined>(undefined);

	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedProduct;

	categoriesViewInit = signal(false);

	webstorePageStore = inject(webstorePageStore);
	tr = this.webstorePageStore.tr();

	constructor() {}

	async toggleLang() {
		this.tr
			.use(this.tr.currentLang === 'en' ? 'ar' : 'en')
			.subscribe(() => console.log(this.tr.instant('body')));
	}

	// Toggle sidebar visibility
	toggleChildTwoVisibility() {
		this.isSideBarVisible.update((value) => !value);
	}
}
