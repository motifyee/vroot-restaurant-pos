import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'unattended-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/unattended.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnattendedIconComponent {}
