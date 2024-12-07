import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'search-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/search.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchIconComponent {}
