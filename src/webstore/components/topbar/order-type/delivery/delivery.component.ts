import { Component } from '@angular/core';
import { scaleInOut } from '../../../../animations/scale-in-out.animation';

@Component({
	selector: 'app-delivery',
	standalone: true,
	templateUrl: './delivery.component.html',
	styleUrl: './delivery.component.scss',
	animations: [scaleInOut],
})
export class DeliveryComponent {}
