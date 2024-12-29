import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	EventEmitter,
	HostBinding,
	inject,
	input,
	OnInit,
	Output,
	signal,
	ViewChild,
} from '@angular/core';
import { userStore } from '@webstore/state';
import { ModalComponent } from '../modal/modal.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { scaleInOut } from '../../animations/scale-in-out.animation';
import { MessageModule } from 'primeng/message';

const left = style({ transform: 'translateX(-100%)' });
const right = style({ transform: 'translateX(100%)' });
const visible = style({ transform: 'translateX(0)' });
const timing = '300ms ease-in-out';

@Component({
	selector: 'user-addresses-modal',
	imports: [
		ModalComponent,
		NgTemplateOutlet,
		ButtonModule,
		NgClass,
		FormsModule,
		CheckboxModule,
		MessageModule,
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

	protected addressForm: Partial<Address> = {};
	protected initialFormValue: Partial<Address> = {};

	activeView = signal<'list' | 'editForm' | 'createForm'>('list');

	ngOnInit(): void {
		this.user.getAddresses();
		// this.user.addDumbyAddresses();
	}

	invalidField(field: string) {
		return (
			this.form?.controls[field]?.touched &&
			this.form?.controls[field]?.invalid
		);
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

	error = signal('');
	__showAPIMsg = effect(() => {
		if (this.user.apiMsgConfirmed()) return;

		this.error.set(this.user.apiMsg());

		this.user.confirmApiMsg();
	});

	submitAddressForm(form: NgForm) {
		if (form.invalid) return;

		let params = {
			...this.addressForm,
			areaId: '0158e1c1-5d76-45dc-953d-144a2b0dfe32',
		} as Address;

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
