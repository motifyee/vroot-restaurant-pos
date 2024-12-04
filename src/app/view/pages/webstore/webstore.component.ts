import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { productsPageStore } from './pages/products/products-page.store';
import { _ } from '@ngx-translate/core';
import { webstorePageStore } from './webstore.store';
import { PickBranchPopupComponent } from './components/pick-branch-popup/pick-branch-popup.component';
import { scaleInOut } from './animations/scaleInOut.animation';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { customersStore } from '@src/app/features';
import { settingsStore } from '@src/app/features/settings';

@Component({
	selector: 'webstore',
	standalone: true,
	imports: [
		PickBranchPopupComponent,
		RouterOutlet,
		SidebarComponent,
		TopbarComponent,
		CommonModule,
	],
	templateUrl: './webstore.component.html',
	styleUrls: ['./webstore.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ScrollService,
		productsPageStore,
		webstorePageStore,
		PickBranchPopupComponent,
		customersStore,
		settingsStore,
	],
	animations: [scaleInOut],
})
export class WebstoreComponent implements OnInit {
	isSideBarVisible = signal(false);
	isOrderDetailsVisible = signal<Product | undefined>(undefined);

	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedProduct;

	categoriesViewInit = signal(false);

	webstorePageStore = inject(webstorePageStore);
	tr = this.webstorePageStore.tr();

	settings = inject(settingsStore);

	constructor() {}
	ngOnInit(): void {
		this.settings.getCompanyInfo();
	}

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
