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
import { settingsStore } from '@src/app/features/settings';
import { productStore } from '@src/app/features';
import { ButtonModule } from 'primeng/button';
import { scaleInOut } from '../../animations/scaleInOut.animation';
import { ModalComponent } from '../modal/modal.component';
import { IS_DEVMODE } from '@src/app/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'branch-ordertype-picker',
	standalone: true,
	imports: [CommonModule, FormsModule, ButtonModule, ModalComponent],
	templateUrl: './pick-branch-popup.component.html',
	styleUrls: ['./pick-branch-popup.component.scss'],
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

	header = computed(() => {
		if (!this.choosedBranch())
			return this.pendingBranch() ? 'تأكيد' : 'اختر الفرع التشغيلي';

		if (!this.choosedOrderType()) return 'اختر نوع الطلب';

		return '';
	});

	isDismissable = computed(() => {
		switch (this.target()) {
			case 'all':
				return !!(
					this.settings.selectedBranch?.() &&
					this.settings.orderType()
				);
			case 'branch':
				return !!this.settings.selectedBranch?.();
			case 'orderType':
				return !!this.settings.orderType();
		}
	});

	target = input<'branch' | 'orderType' | 'all'>('all');

	choosedBranch = signal(false);
	choosedOrderType = signal(false);
	_ = effect(
		() => {
			// !TODO replace with angular 19 updatable computed
			this.choosedBranch.set(!['branch', 'all'].includes(this.target()));
			this.choosedOrderType.set(
				!['orderType', 'all'].includes(this.target()),
			);
		},
		{ allowSignalWrites: true },
	);

	__ = effect(
		() =>
			this.choosedBranch() &&
			this.choosedOrderType() &&
			this.onFinished.emit(),
	);

	settings = inject(settingsStore);
	products = inject(productStore);

	@Output() onCancel = new EventEmitter();
	@Output() onFinished = new EventEmitter();

	branch = signal<Branch | undefined>(undefined);

	pendingBranch = signal<Branch | undefined>(undefined);
	selectBranch(branch: Branch) {
		const changed = branch.id !== this.settings.selectedBranch?.()?.id;

		if (changed && this.products.cartProductsEntities().length)
			return this.pendingBranch.set(branch);

		if (this.pendingBranch()) this.pendingBranch.set(undefined);

		this.settings.selectBranch(branch);
		this.choosedBranch.set(true);

		this.products
			.getCategories(branch.id)
			.subscribe(
				(m) =>
					IS_DEVMODE &&
					localStorage.getItem('test-branch-idx') &&
					localStorage.setItem('test-products', JSON.stringify(m)),
			);
	}

	selectOrderType(type: 'delivery' | 'pickup') {
		this.settings.selectOrderType(type);
		this.choosedOrderType.set(true);
	}

	dismiss() {
		this.isDismissable() && this.onCancel.emit();
	}
}
