import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'more-info-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/more-info.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreInfoIconComponent {}
