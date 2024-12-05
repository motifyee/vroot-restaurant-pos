import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'filter-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/filter.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterIconComponent {}
