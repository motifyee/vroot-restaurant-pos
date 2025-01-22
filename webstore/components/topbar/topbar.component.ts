import {
	AfterViewInit,
	Component,
	computed,
	ElementRef,
	inject,
	output,
	signal,
	ViewChild,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { invoiceStore, settingsStore } from '@webstore/state';
import { BranchOrderTypePickerComponent } from '../pick-branch-modal/pick-branch-modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';

@Component({
	selector: 'topbar',
	imports: [
		BranchOrderTypePickerComponent,
		SidebarComponent,
		BgImageComponent,
	],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements AfterViewInit {
	toggleSideBarVisibility = output<void>();

	scrollService = inject(ScrollService);
	isSideBarVisible = signal(false);

	branchOrderTypeTarget = signal<'branch' | 'orderType'>('branch');

	ngAfterViewInit(): void {
		if (!this.container) return;

		this.scrollService.headerEl.set(this.container.nativeElement);
	}

	settings = inject(settingsStore);

	invoice = inject(invoiceStore);
	orderType = computed(
		() =>
			this.invoice.activeInvoice()?.salesInvoiceType ||
			this.settings.defaultInvoiceType(),
	);

	orderTypeTitle = computed(() =>
		this.orderType()
			? InvoiceType[this.orderType()!]
			: this.settings.defaultInvoiceType(),
	);

	deliveryTitle = computed(() => {
		if (!this.settings.selectedBranch?.()) return '';
		if (this.orderType() == InvoiceType.delivery) return 'ديليفري';
		if (this.orderType() == InvoiceType.pickup) return 'استلام من الفرع';
		return '';
	});

	branchName = computed(() => this.settings.selectedBranch?.()?.name ?? '');

	@ViewChild('container') container: ElementRef<HTMLElement> | undefined;

	isBranchOrderTypePickerVisible = signal(false);
	showOrderTypePicker(target: 'branch' | 'orderType') {
		this.branchOrderTypeTarget.set(target);
		this.isBranchOrderTypePickerVisible.set(true);
	}

	isOrderTimeVisible = signal(false);
}
