import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { PickupComponent } from './pickup/pickup.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DriveComponent } from './drive/drive.component';
import { scaleInOut } from '../../../animations/scaleInOut.animation';

type OrderOptionType = 'delivery' | 'pickup' | 'drive';

@Component({
	selector: 'order-type',
	standalone: true,
	imports: [CommonModule, PickupComponent, DeliveryComponent, DriveComponent],
	templateUrl: './order-type.component.html',
	styleUrls: ['./order-type.component.scss'],
	animations: [scaleInOut],
	host: { class: 'popup' },
})
export class OrderOptionComponent {
	@Output() onClose = new EventEmitter<void>();

	activeTab = signal<OrderOptionType>('delivery'); // Set initial active tab
}
