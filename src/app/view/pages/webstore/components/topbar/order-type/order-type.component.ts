import { CommonModule } from '@angular/common';
import { Component, input, EventEmitter, Output, signal } from '@angular/core';
import { PickupComponent } from './pickup/pickup.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DriveComponent } from './drive/drive.component';
import { PhonePopupComponent } from './delivery/components/phone-popup/phone-popup.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { scaleInOut } from '../../../animations/scaleInOut.animation';

type OrderOptionType = 'delivery' | 'pickup' | 'drive';

@Component({
	selector: 'order-type',
	standalone: true,
	imports: [
		CommonModule,
		PickupComponent,
		DeliveryComponent,
		DriveComponent,
		PhonePopupComponent,
	],
	templateUrl: './order-type.component.html',
	styleUrls: ['./order-type.component.scss'],
	animations: [scaleInOut],
})
export class OrderOptionComponent {
	@Output() onClose = new EventEmitter<void>();

	activeTab = signal<OrderOptionType>('delivery'); // Set initial active tab
}
