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

import { customersStore } from './view/stores/state/customers.store';
import { MenubarComponent } from './view/components/menubar/menubar.component';
import { InvoicePanelComponent } from './view/components/invoice-panel/invoice-panel.component';
import { ProductsPanelComponent } from './view/components/products-panel/products-panel.component';

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
	],
	providers: [customersStore],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	title = 'restaurant-pos';
	logger = LoggerService.injectWithHeader('AppComponent');
	#store = inject(customersStore);
	get store$() {
		return this.#store;
	}

	ngOnInit(): void {
		this.logger.log('test logger');

		// testCallback();
	}
}
