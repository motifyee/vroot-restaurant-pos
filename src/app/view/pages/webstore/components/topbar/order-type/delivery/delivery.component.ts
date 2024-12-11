import { Component, signal } from '@angular/core';
import { PhonePopupComponent } from '../../../auth-modal/auth-modal.component';
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
	isAuthModalVisible = signal(true);
}
