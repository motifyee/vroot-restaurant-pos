import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'arrow-left-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/arrow-left.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowLeftIconComponent {}
