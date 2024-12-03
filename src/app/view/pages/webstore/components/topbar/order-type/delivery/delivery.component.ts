import { Component, signal } from '@angular/core';
import { PhonePopupComponent } from './components/phone-popup/phone-popup.component';

@Component({
	selector: 'app-delivery',
	standalone: true,
	imports: [PhonePopupComponent],
	templateUrl: './delivery.component.html',
	styleUrl: './delivery.component.scss',
})
export class DeliveryComponent {
	isAddPhoneVisible = signal(false);
}
