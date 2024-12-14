import { Component } from '@angular/core';
import { scaleInOut } from '../../../../animations/scaleInOut.animation';

@Component({
	selector: 'app-delivery',
	standalone: true,
	templateUrl: './delivery.component.html',
	styleUrl: './delivery.component.scss',
	animations: [scaleInOut],
})
export class DeliveryComponent {}
