import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { appStoreToken } from '../../stores/app/app.store';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
	selector: 'menubar',
	standalone: true,
	imports: [
		MenubarModule,
		ToastModule,
		ButtonModule,
		ButtonGroupModule,
		CardModule,
		DividerModule,
		MenuModule,
		OverlayPanelModule,
		InputGroupModule,
		InputGroupAddonModule,
		ChipsModule,
	],
	providers: [MessageService],
	templateUrl: './menubar.component.html',
	styleUrl: './menubar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent implements OnInit {
	constructor(private messageService: MessageService) {}

	appStore = inject(appStoreToken);

	items: MenuItem[] | undefined;

	ngOnInit() {
		this.items = [
			{
				label: 'invoices',
				icon: 'pi pi-list',
				command: () => this.appStore.createInvoiceListTab(),
			},
		];

		this.appStore.createInvoiceTab();
	}
}
