import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoggerService } from '../../../core';

import { MenubarComponent } from './menubar/menubar.component';
import { InvoicePanelComponent } from './shared/invoice-panel/invoice-panel.component';
import { ProductsPanelComponent } from './invoice-tab/components/products-panel/products-panel.component';
import { customersStore } from '../../../features';
import { InvoiceListPanelComponent } from './invoice-list-tab/components/invoice-list-panel/invoice-list-panel.component';
import { InvoiceTabComponent } from './invoice-tab/invoice-tab.component';
import { InvoiceListTabComponent } from './invoice-list-tab/invoice-list-tab.component';
import { appStore } from '../../state/app/app.store';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'root',
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
        TabViewModule,
        ToggleButtonModule,
        FormsModule,
    ],
    providers: [customersStore],
    templateUrl: './pos.component.html',
    styleUrl: './pos.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class POSComponent implements OnInit {
	msgService = inject(MessageService);

	title = 'restaurant-pos';
	logger = LoggerService.injectWithHeader('AppComponent');
	#store = inject(customersStore);
	get store$() {
		return this.#store;
	}

	checked = false;

	appStore = inject(appStore);
	activeTabIndex = computed(() => {
		return this.appStore.activeTabIdx?.() ?? 0;
	});

	ngOnInit(): void {
		this.logger.log('test logger');
		this.appStore.createInvoiceListTab();
		this.appStore.createInvoiceTab();
	}
}
