import { Component, signal } from '@angular/core';
import { PhonePopupComponent } from './components/phone-popup/phone-popup.component';
import { scaleInOut } from '../../../../animations/scaleInOut.animation';

@Component({
	selector: 'app-delivery',
	standalone: true,
	imports: [PhonePopupComponent],
	templateUrl: './delivery.component.html',
	styleUrl: './delivery.component.scss',
	animations: [scaleInOut],
})
export class DeliveryComponent {
	isAddPhoneVisible = signal(true);
}
