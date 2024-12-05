import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'dismiss-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/dismiss.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DismissIconComponent {}
