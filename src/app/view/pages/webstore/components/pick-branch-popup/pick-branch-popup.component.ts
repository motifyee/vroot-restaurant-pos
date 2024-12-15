import {
	Component,
	effect,
	EventEmitter,
	HostBinding,
	inject,
	input,
	OnInit,
	Output,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { settingsStore } from '@src/app/features/settings';
import { floatUp } from '../../animations/float.animation';
import { productStore } from '@src/app/features';
import { ButtonModule } from 'primeng/button';
import { scaleInOut } from '../../animations/scaleInOut.animation';

@Component({
	selector: 'branch-ordertype-picker',
	standalone: true,
	imports: [CommonModule, FormsModule, ButtonModule],
	templateUrl: './pick-branch-popup.component.html',
	styleUrls: ['./pick-branch-popup.component.scss'],
	animations: [floatUp, scaleInOut],
	host: { class: 'popup' },
})
export class BranchOrderTypePickerComponent implements OnInit {
	@HostBinding('@scaleInOut') scaleInOut = true;

	target = input<'branch' | 'orderType' | 'all'>('all');

	choosedBranch = signal(this.target() in ['branch', 'all']);
	choosedOrderType = signal(this.target() in ['orderType', 'all']);

	_ = effect(
		() =>
			this.choosedBranch() &&
			this.choosedOrderType() &&
			this.onFinished.emit(),
	);
	ngOnInit(): void {
		this.choosedBranch = signal(false);
	}

	settings = inject(settingsStore);
	products = inject(productStore);

	@Output() onCancel = new EventEmitter();
	@Output() onFinished = new EventEmitter();

	branch = signal<Branch | undefined>(undefined);

	selectBranch(branch?: Branch) {
		this.settings.selectBranch(branch);

		if (!branch) this.products.emptyCart();
		else {
			this.choosedBranch.set(true);
			this.products.getCategories(branch.id).subscribe();
		}
	}

	selectOrderType(type: 'delivery' | 'pickup') {
		this.settings.selectOrderType(type);
		this.choosedOrderType.set(true);
	}

	cancel() {
		if (!this.settings.selectedBranch?.()) return;

		if (!this.settings.orderType()) this.settings.selectOrderType('pickup');

		this.onCancel.emit();
	}
}
