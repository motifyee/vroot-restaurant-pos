import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'captain-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/captain.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptainIconComponent {}
