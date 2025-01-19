import {
	Component,
	computed,
	effect,
	EventEmitter,
	HostBinding,
	inject,
	input,
	Output,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { invoiceStore, menuStore, settingsStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { scaleInOut } from '../../animations/scale-in-out.animation';
import { ModalComponent } from '../modal/modal.component';
import { IS_DEVMODE } from '@src/app/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';

export type PickBranchModalTarget = 'branch' | 'orderType' | 'all';

@Component({
	selector: 'branch-ordertype-picker',
	imports: [CommonModule, FormsModule, ButtonModule, ModalComponent],
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
export class BranchOrderTypePickerComponent {
	@HostBinding('@scaleInOut') scaleInOut = true;
	readonly InvoiceType = InvoiceType;

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
					this.settings.defaultOrderType()
				);
			case 'branch':
				return !!this.settings.selectedBranch?.();
			case 'orderType':
				return !!this.settings.defaultOrderType();
		}
	});

	target = input<PickBranchModalTarget>('all');

	choosedBranch = signal(false);
	choosedOrderType = signal(false);
	_ = effect(() => {
		// !TODO replace with angular 19 updatable computed
		this.choosedBranch.set(!['branch', 'all'].includes(this.target()));
		this.choosedOrderType.set(
			!['orderType', 'all'].includes(this.target()),
		);
	});

	__ = effect(
		() =>
			this.choosedBranch() &&
			this.choosedOrderType() &&
			this.onFinished.emit(),
	);

	settings = inject(settingsStore);
	invoiceStore = inject(invoiceStore);
	menu = inject(menuStore);

	@Output() onCancel = new EventEmitter();
	@Output() onFinished = new EventEmitter();

	branch = signal<Branch | undefined>(undefined);

	pendingBranch = signal<Branch | undefined>(undefined);
	selectBranch(branch: Branch) {
		const changed = branch.id !== this.settings.selectedBranch?.()?.id;

		if (changed && this.invoiceStore.activeInvoice()?.products.length)
			return this.pendingBranch.set(branch);

		if (this.pendingBranch()) this.pendingBranch.set(undefined);

		this.settings.selectBranch(branch);
		this.choosedBranch.set(true);
	}

	selectOrderType(type: InvoiceType) {
		if (!this.invoiceStore.activeInvoice())
			return this.settings.selectDefaultOrderType(type);

		this.invoiceStore
			.updateActiveInvoice({
				salesInvoiceType: type,
			})
			?.subscribe(() => this.choosedOrderType.set(true));
	}

	dismiss() {
		this.isDismissable() && this.onCancel.emit();
	}
}
