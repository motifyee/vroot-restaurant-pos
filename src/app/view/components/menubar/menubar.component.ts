import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

@Component({
	selector: 'menubar',
	standalone: true,
	imports: [
		MenubarModule,
		ToastModule,
		ButtonModule,
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

	items: MenuItem[] | undefined;

	ngOnInit() {
		this.items = [
			{
				label: 'invoices',
				icon: 'pi pi-refresh',
			},
		];
	}
}
