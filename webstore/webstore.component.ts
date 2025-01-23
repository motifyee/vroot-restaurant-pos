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
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { userStore, settingsStore, invoiceStore } from '@webstore/state';
import { routeAnimation } from './animations/route.animation';

@Component({
	selector: 'webstore',
	imports: [RouterOutlet, TopbarComponent, CommonModule],
	templateUrl: './webstore.component.html',
	styleUrls: ['./webstore.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ScrollService, productsPageStore, webstorePageStore],
	animations: [scaleInOut, routeAnimation],
	host: {
		'[attr.dir]': '"rtl"',
	},
})
export class WebstoreComponent implements OnInit {
	isSideBarVisible = signal(false);
	scrollService = inject(ScrollService);

	productsPageStore = inject(productsPageStore);
	selectedProduct = this.productsPageStore.selectedProduct;

	categoriesViewInit = signal(false);

	webstorePageStore = inject(webstorePageStore);
	tr = this.webstorePageStore.tr();

	settings = inject(settingsStore);
	user = inject(userStore);
	invoices = inject(invoiceStore);

	constructor() {}
	ngOnInit(): void {
		this.user.loadUserData();

		this.settings.getCompanyInfo().subscribe((info) => {
			if (info.branchs.length == 1)
				this.settings.selectBranch(info.branchs[0]);
			else this.settings.loadSelectedBranch();

			document.title = `WebStore — ${info.name}`;
		});

		this.invoices.loadActiveInvoice();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.scrollService.isMobileView.set(window.innerWidth <= 750);
		this.scrollService.isTabletView.set(
			window.innerWidth <= 1000 && window.innerWidth > 750,
		);
		this.scrollService.isWideScreen.set(event.target.innerWidth > 1000);
	}

	async toggleLang() {
		this.tr
			.use(this.tr.currentLang === 'en' ? 'ar' : 'en')
			.subscribe(() => console.log(this.tr.instant('body')));
	}

	contexts = inject(ChildrenOutletContexts);
	routeAnimationData() {
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
			'animation'
		];
	}

	refresh() {
		window.location.reload();
	}
}
