import { CommonModule } from '@angular/common';
import { Component, input, EventEmitter, Output, signal } from '@angular/core';
import { PickupComponent } from './pickup/pickup.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DriveComponent } from './drive/drive.component';
import { PhonePopupComponent } from './delivery/components/phone-popup/phone-popup.component';

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
})
export class OrderOptionComponent {
	isVisible = input.required<boolean>();

	@Output() toggleVisibility = new EventEmitter<void>();

	activeTab = signal<OrderOptionType>('delivery'); // Set initial active tab
}
