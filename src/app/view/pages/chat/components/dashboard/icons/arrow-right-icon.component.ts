import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'arrow-right-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/arrow-right.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowRightIconComponent {}
