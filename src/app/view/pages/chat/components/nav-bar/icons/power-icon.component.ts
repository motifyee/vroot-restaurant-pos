import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'power-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/power.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerIconComponent {}
