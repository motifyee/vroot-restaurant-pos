import {
	Component,
	computed,
	effect,
	EventEmitter,
	HostBinding,
	inject,
	OnInit,
	Output,
	signal,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { settingsStore, userStore } from '@webstore/state';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { scaleInOut } from '../../animations/scale-in-out.animation';
import { ModalComponent } from '../modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'auth-modal',
	imports: [
		CommonModule,
		FormsModule,
		NgTemplateOutlet,
		ToastModule,
		ModalComponent,
		ButtonModule,
		MessageModule,
	],
	templateUrl: './auth-modal.component.html',
	styleUrls: ['./auth-modal.component.scss'],
	host: { class: 'popup' },
	animations: [scaleInOut],
})
export class AuthModalComponent implements OnInit {
	@HostBinding('@scaleInOut') scaleInOut = true;

	userStore = inject(userStore);
	settings = inject(settingsStore);

	@Output() onDismissed = new EventEmitter<void>();
	@Output() onFinished = new EventEmitter<void>();

	header = computed(
		() =>
			({
				'check-phone': 'التحقق من رقم الهاتف',
				'verify-otp': 'ادخل رمز التحقق',
				register: 'تسجيل حساب جديد',
				login: 'تسجيل الدخول',
				done: 'تم التسجيل بنجاح',
			})[this.userStore.registerationStep()],
	);

	name = signal('');
	phone = signal('');
	password = signal('');
	confirmPassword: any;

	error = signal('');
	__showAPIMsg = effect(() => {
		if (this.userStore.apiMsgConfirmed()) return;

		this.error.set(this.userStore.apiMsg());

		this.userStore.confirmApiMsg();
	});

	__finished = effect(() => {
		if (this.userStore.registerationStep() === 'done')
			this.onFinished.emit();
	});

	ngOnInit(): void {}

	checkPhone() {
		this.userStore.checkPhone({
			countryCode: this.userStore.user().countryCode,
			phone: this.phone(),
			companyId: this.settings.companyInfo().companyId,
		});
	}
	register() {
		this.userStore.register({
			countryCode: this.userStore.user().countryCode,
			phone: this.phone(),
			name: this.name(),
			companyId: this.settings.companyInfo().companyId,
			password: this.password(),
		});
	}

	login() {
		this.userStore.login({
			countryCode: this.userStore.user().countryCode,
			phone: this.phone(),
			companyId: this.settings.companyInfo().companyId,
			password: this.password(),
		});
	}

	dismiss() {
		this.onDismissed.emit();
		this.userStore.setRegistrationStep('check-phone');
		this.userStore.removeUserData();
	}
}
