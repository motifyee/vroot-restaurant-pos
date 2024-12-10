import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'plus-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/plus.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusIconComponent {}
