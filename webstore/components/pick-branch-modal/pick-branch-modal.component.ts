import {
	Component,
	computed,
	effect,
	HostBinding,
	inject,
	input,
	OnDestroy,
	OnInit,
	output,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { invoiceStore, menuStore, settingsStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { scaleInOut } from '../../animations/scale-in-out.animation';
import { ModalComponent } from '../modal/modal.component';

import { animate, style, transition, trigger } from '@angular/animations';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';
import { MessageModule } from 'primeng/message';
import { UPDATE_INVOICE } from '@webstore/state/invoice/features/with-update-invoice.method';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize } from 'rxjs';
import { DELETE_INVOICE } from '@webstore/state/invoice/features/with-delete-invoice.method';

export type PickBranchModalTarget = 'branch' | 'orderType' | 'all';

@Component({
	selector: 'branch-ordertype-picker',
	imports: [
		CommonModule,
		FormsModule,
		ButtonModule,
		ModalComponent,
		MessageModule,
		ProgressSpinnerModule,
	],
	templateUrl: './pick-branch-modal.component.html',
	styleUrls: ['./pick-branch-modal.component.scss'],
	animations: [
		scaleInOut,
		trigger('slideIn', [
			transition(':enter', [
				style({ transform: 'translateX(-100%)' }),
				animate(
					'300ms ease-in-out',
					style({ transform: 'translateX(0)' }),
				),
			]),
		]),
	],
	host: { class: 'popup' },
})
export class BranchOrderTypePickerComponent implements OnInit, OnDestroy {
	@HostBinding('@scaleInOut') scaleInOut = true;
	readonly InvoiceType = InvoiceType;

	settings = inject(settingsStore);
	invoices = inject(invoiceStore);
	menu = inject(menuStore);

	onCancel = output<void>();
	onFinished = output<void>();

	// ###########################################################################

	header = computed(() => {
		if (!this.choosedBranch())
			return this.pendingBranch() ? 'تأكيد' : 'برجاء اختيار الفرع';

		if (!this.choosedOrderType()) return 'اختر نوع الطلب';

		return '';
	});

	headerIconUrl = computed(() => {
		if (this.choosedBranch()) return '';
		return this.pendingBranch() ? '' : 'assets/icons/branch.svg';
	});

	isDismissable = computed(() => {
		switch (this.target()) {
			case 'all':
				return !!(
					this.settings.selectedBranch?.() &&
					this.settings.defaultInvoiceType()
				);
			case 'branch':
				return !!this.settings.selectedBranch?.();
			case 'orderType':
				return (
					!!this.settings.defaultInvoiceType() ||
					!!this.invoices.activeInvoice()?.salesInvoiceType
				);
		}
	});

	// ###########################################################################

	loading = signal<number | string>(-1);

	// ###########################################################################

	hasUpdateMsg = computed(() => this.invoices.isApiMsgActive(UPDATE_INVOICE));
	updateMsg = computed(() => this.invoices.getApiMsg(UPDATE_INVOICE));
	clearUpdateMsg = () => this.invoices.clearApiMsg(UPDATE_INVOICE);

	hasDeleteMsg = computed(() => this.invoices.isApiMsgActive(DELETE_INVOICE));
	deleteMsg = computed(() => this.invoices.getApiMsg(DELETE_INVOICE));
	clearDeleteMsg = () => this.invoices.clearApiMsg(DELETE_INVOICE);

	ngOnInit() {
		this.clearUpdateMsg();
		this.clearDeleteMsg();
	}
	ngOnDestroy() {
		this.clearUpdateMsg();
		this.clearDeleteMsg();
	}

	// ###########################################################################

	target = input<PickBranchModalTarget>('all');

	choosedBranch = signal(false);
	choosedOrderType = signal(false);
	__setChoosen = effect(() => {
		// !TODO replace with angular 19 updatable computed
		this.choosedBranch.set(!['branch', 'all'].includes(this.target()));
		this.choosedOrderType.set(
			!['orderType', 'all'].includes(this.target()),
		);
	});

	__emitFinished = effect(
		() =>
			this.choosedBranch() &&
			this.choosedOrderType() &&
			this.onFinished.emit(),
	);

	branch = signal<Branch | undefined>(undefined);

	pendingBranch = signal<Branch | undefined>(undefined);
	selectBranch(branch: Branch) {
		const branchChanged =
			branch.id !== this.settings.selectedBranch?.()?.id;

		if (branchChanged && !!this.invoices.activeInvoice())
			return this.pendingBranch.set(branch);

		if (this.pendingBranch()) this.pendingBranch.set(undefined);

		this.settings.selectBranch(branch);
		this.choosedBranch.set(true);
	}

	deleteActiveInvoice() {
		this.loading.set('deleting');
		this.clearDeleteMsg();

		this.invoices
			.deleteActiveInvoice()
			?.pipe(finalize(() => this.loading.set(-1)))
			.subscribe(() => {
				this.selectBranch(this.pendingBranch()!);
			});
	}

	selectOrderType(type: InvoiceType) {
		if (!this.invoices.activeInvoice()) {
			this.settings.selectDefaultInvoiceType(type);
			this.choosedOrderType.set(true);
			return;
		}

		this.loading.set(type);

		this.invoices
			.updateActiveInvoice({
				salesInvoiceType: type,
			})
			?.pipe(finalize(() => this.loading.set(-1)))
			.subscribe(() => this.choosedOrderType.set(true));
	}

	// ###########################################################################

	dismiss() {
		this.isDismissable() && this.onCancel.emit();
	}
}
