import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'gear-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/gear.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearIconComponent {}

