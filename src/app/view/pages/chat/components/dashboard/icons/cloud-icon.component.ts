import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'cloud-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/cloud.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudIconComponent {}
