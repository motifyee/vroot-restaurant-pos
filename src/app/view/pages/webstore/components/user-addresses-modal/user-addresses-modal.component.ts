import {
	ChangeDetectionStrategy,
	Component,
	computed,
	EventEmitter,
	HostBinding,
	inject,
	input,
	OnInit,
	Output,
	signal,
	ViewChild,
} from '@angular/core';
import { UpdateAddressParams, userStore } from '@src/app/features';
import { ModalComponent } from '../modal/modal.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { scaleInOut } from '../../animations/scaleInOut.animation';

const left = style({ transform: 'translateX(-100%)' });
const right = style({ transform: 'translateX(100%)' });
const visible = style({ transform: 'translateX(0)' });
const timing = '300ms ease-in-out';

declare interface AddressModel {
	id?: number;
	title?: string;
	address?: string;
	isDefault?: boolean;
}

@Component({
	selector: 'user-addresses-modal',
	standalone: true,
	imports: [
		ModalComponent,
		NgTemplateOutlet,
		ButtonModule,
		NgClass,
		FormsModule,
		CheckboxModule,
	],
	templateUrl: './user-addresses-modal.component.html',
	styleUrl: './user-addresses-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'popup' },
	animations: [
		scaleInOut,
		trigger('formIn', [
			transition(':enter', [left, animate(timing, visible)]),
		]),
		trigger('listIn', [
			transition(':enter', [right, animate(timing, visible)]),
		]),
		trigger('addressOut', [transition(':leave', [animate(timing, right)])]),
	],
})
export class UserAddressesModalComponent implements OnInit {
	@HostBinding('@scaleInOut') scaleInOut = true;

	header = input<string>('عناويني');
	header$ = computed(() => {
		switch (this.activeView()) {
			case 'createForm':
				return 'اضافة عنوان';

			case 'editForm':
				return 'تعديل عنوان';

			default:
				return this.header();
		}
	});

	@Output() onDismissed = new EventEmitter<void>();
	@Output() onSelected = new EventEmitter<Address>();

	@ViewChild('_form') public form?: NgForm;

	slideState = 'enter';

	user = inject(userStore);

	protected addressForm: AddressModel = {};
	protected initialFormValue: AddressModel = {};

	activeView = signal<'list' | 'editForm' | 'createForm'>('list');

	ngOnInit(): void {
		// this.user.getAddresses();
		this.user.addDumbyAddresses();
	}

	startEditAddress(address: Address) {
		this.addressForm = address;
		this.initialFormValue = { ...address };
		this.activeView.set('editForm');
	}

	startAddAddress() {
		this.addressForm = {};
		this.initialFormValue = {};
		this.activeView.set('createForm');
	}

	get isSubmitEnabled() {
		return (
			this.form?.valid &&
			JSON.stringify(this.addressForm) !==
				JSON.stringify(this.initialFormValue)
		);
	}

	submitAddressForm(form: NgForm) {
		if (form.invalid) return;

		let params = {
			...this.addressForm,
			userId: this.user.user().id,
		} as UpdateAddressParams;

		const obs =
			this.activeView() == 'createForm'
				? this.user.createAddress(params)
				: this.user.updateAddress(params);
		obs.subscribe(() => {
			this.user.getAddresses();
			this.activeView.set('list');
		});
	}
}
