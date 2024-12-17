import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { ScrollService } from './services/scroll.service';
import { productsPageStore } from './pages/products/products-page.store';
import { _ } from '@ngx-translate/core';
import { webstorePageStore } from './webstore.store';
import { scaleInOut } from './animations/scale-in-out.animation';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { userStore } from '@webstore/features';
import { settingsStore } from '@src/webstore/features/settings';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'webstore',
	standalone: true,
	imports: [RouterOutlet, TopbarComponent, CommonModule],
	templateUrl: './webstore.component.html',
	styleUrls: ['./webstore.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ScrollService,
		productsPageStore,
		webstorePageStore,
		MessageService,
	],
	animations: [scaleInOut],
	host: {
		'[attr.dir]': '"rtl"',
	},
})
export class WebstoreComponent implements OnInit {
	isSideBarVisible = signal(false);
	isOrderDetailsVisible = signal<Product | undefined>(undefined);
	scrollService = inject(ScrollService);

	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedVariant;

	categoriesViewInit = signal(false);

	webstorePageStore = inject(webstorePageStore);
	tr = this.webstorePageStore.tr();

	settings = inject(settingsStore);
	user = inject(userStore);

	constructor() {}
	ngOnInit(): void {
		this.settings.getCompanyInfo().subscribe((info) => {
			if (info.branchs.length == 1)
				this.settings.selectBranch(info.branchs[0]);

			document.title = `WebStore [ ${info.name} ]`; // `${info.name} - WebStore`;
		});

		this.user.loadUserData();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.scrollService.isNarrowScreen.set(event.target.innerWidth <= 1000);
	}

	async toggleLang() {
		this.tr
			.use(this.tr.currentLang === 'en' ? 'ar' : 'en')
			.subscribe(() => console.log(this.tr.instant('body')));
	}
}
