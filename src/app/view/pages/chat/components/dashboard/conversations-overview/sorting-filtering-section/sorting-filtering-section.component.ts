import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SortIconComponent } from '../../icons/sort-icon.component';
import { FilterIconComponent } from '../../icons/filter-icon.component';

@Component({
	selector: 'sorting-filtering-section',
	standalone: true,
	imports: [SortIconComponent, FilterIconComponent],
	templateUrl: './sorting-filtering-section.component.html',
	styleUrl: './sorting-filtering-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingFilteringSectionComponent {}
