import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoggerService } from './core';

import { MenubarComponent } from './view/components/menubar/menubar.component';
import { InvoicePanelComponent } from './view/components/invoice-panel/invoice-panel.component';
import { ProductsPanelComponent } from './view/components/products-panel/products-panel.component';
import { customersStoreToken } from './features';
import { InvoiceListPanelComponent } from './view/components/invoice-list-panel/invoice-list-panel.component';
import { Tab } from './view/stores/app/models/tab.model';
import { InvoiceTabComponent } from './view/components/invoice-tab/invoice-tab.component';
import { InvoiceListTabComponent } from './view/components/invoice-list-tab/invoice-list-tab.component';
import { appStoreToken } from './view/stores/app/app.store';

@Component({
	selector: 'root',
	standalone: true,
	imports: [
		RouterOutlet,
		ButtonModule,
		JsonPipe,
		MenubarComponent,
		InvoicePanelComponent,
		ProductsPanelComponent,
		InvoiceListPanelComponent,
		InvoiceTabComponent,
		InvoiceListTabComponent,
	],
	providers: [customersStoreToken],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	title = 'restaurant-pos';
	logger = LoggerService.injectWithHeader('AppComponent');
	#store = inject(customersStoreToken);
	get store$() {
		return this.#store;
	}

	appStore = inject(appStoreToken);

	activeTab?: Tab;

	ngOnInit(): void {
		this.logger.log('test logger');
	}
}
