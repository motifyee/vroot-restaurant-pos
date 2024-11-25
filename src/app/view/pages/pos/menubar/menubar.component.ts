import {
	ChangeDetectionStrategy,
	Component,
	computed,
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
import { Menu, MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { appStore } from '../../../state/app/app.store';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { Tab } from '@src/app/view/state/app/models/tab.model';
import { BadgeModule } from 'primeng/badge';

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
		DialogModule,
		TabMenuModule,
		BadgeModule,
	],
	providers: [MessageService],
	templateUrl: './menubar.component.html',
	styleUrl: './menubar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent implements OnInit {
	constructor() {}

	msgService = inject(MessageService);
	appStore = inject(appStore);

	items: MenuItem[] = [
		{
			label: 'invoices',
			icon: 'pi pi-list',
			command: () => this.appStore.createInvoiceListTab(),
		},
	];

	ngOnInit() {}

	get showConfirmCloseUnsavedTab() {
		return !!this.appStore.confirmCloseUnsavedTabId();
	}
	set showConfirmCloseUnsavedTab(value: boolean) {
		if (!value) this.appStore.setConfirmCloseUnsavedTab();
	}

	get closingTabId() {
		return this.appStore.confirmCloseUnsavedTabId();
	}

	get closingTab() {
		return this.appStore.entityMap()[this.closingTabId];
	}

	get confirmSaveBtnLoading() {
		return this.closingTab?.isLoading();
	}

	saveTab() {
		this.closingTab?.save().subscribe({
			next: () => {
				this.appStore.closeTab(this.closingTabId);
				this.showConfirmCloseUnsavedTab = false;
				this.msgService.add({
					severity: 'success',
					summary: 'Saved',
					detail: 'Your changes have been saved',
					life: 3000,
				});
			},
			error: () => {
				this.msgService.add({
					severity: 'error',
					summary: 'Error',
					detail: 'An error occurred while saving your changes',
					life: 3000,
				});
			},
		});
	}

	discardTab() {
		this.closingTab?.discard();
		this.appStore.closeTab(this.closingTabId);

		this.showConfirmCloseUnsavedTab = false;

		this.msgService.add({
			severity: 'error',
			summary: 'Discarded',
			detail: 'Your changes have been discarded',
			life: 3000,
		});
	}

	_createMenuItem(tab?: Tab): MenuItem {
		if (!tab) return {} as MenuItem;
		let res: MenuItem = {
			label: tab.title(),
			icon: tab.icon(),
			id: tab.id,
			hasChanges: tab.hasChanges(),
			command: () => this.appStore.activateTab(tab.id as string),
		};

		return res;
	}

	activeItem = computed(() =>
		this.menuitems().find(
			(item) => item.id === this.appStore.activeTabId(),
		),
	);

	menuitems = computed(() =>
		this.appStore.ids().map((id) => {
			const tab = this.appStore.entityMap()[id];
			return this._createMenuItem(tab);
		}),
	);

	chngActiveItem = (menuitem: MenuItem) => {
		if (!menuitem || !menuitem.id) return;
		if (this.appStore.activeTabId() === menuitem.id) return;
		this.appStore.activateTab(menuitem.id);
	};
}
