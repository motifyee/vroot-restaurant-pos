import {
	Component,
	computed,
	EventEmitter,
	inject,
	Output,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { customersStore } from '@src/app/features';
import { FormsModule } from '@angular/forms';

type Step = 'check-mobile' | 'otp' | 'register' | 'login';

@Component({
	selector: 'auth-modal',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './auth-modal.component.html',
	styleUrls: ['./auth-modal.component.scss'],
})
export class PhonePopupComponent {
	@Output() dismiss = new EventEmitter<void>();

	step = signal<Step>('check-mobile');
	header = computed(
		() =>
			({
				'check-mobile': 'التحقق من رقم الهاتف',
				otp: 'ادخل رمز التحقق',
				register: 'تسجيل حساب جديد',
				login: 'تسجيل الدخول',
			})[this.step()],
	);

	customerStore = inject(customersStore);

	mobile = signal('');

	register() {
		this.customerStore.create({
			name: 'John Doe',
			mobile: this.mobile(),
		});
	}
}