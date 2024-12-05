import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'list-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/list.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListIconComponent {}
