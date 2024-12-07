import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'sort-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/sort.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortIconComponent {}
