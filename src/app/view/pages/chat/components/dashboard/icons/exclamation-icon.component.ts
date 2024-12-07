import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'exclamation-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/exclamation.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExclamationIconComponent {}
