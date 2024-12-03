import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { customersStore } from '@src/app/features';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'add-phone-popup',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './phone-popup.component.html',
	styleUrls: ['./phone-popup.component.scss'],
})
export class PhonePopupComponent {
	@Output() dismiss = new EventEmitter<void>();

	customerStore = inject(customersStore);

	mobile = signal('');

	register() {
		this.customerStore.create({
			name: 'John Doe',
			mobile: this.mobile(),
		});
	}
}
