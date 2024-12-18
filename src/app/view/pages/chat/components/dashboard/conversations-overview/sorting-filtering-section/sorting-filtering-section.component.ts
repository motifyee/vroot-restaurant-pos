import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SortIconComponent } from '../../icons/sort-icon.component';
import { FilterIconComponent } from '../../icons/filter-icon.component';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';
import { FilterPopupToggleViabilityService } from '../../../../services/dashboard/filter-popup-toggle-viability.service';

@Component({
	selector: 'sorting-filtering-section',
	standalone: true,
	imports: [SortIconComponent, FilterIconComponent, FilterPopupComponent],
	templateUrl: './sorting-filtering-section.component.html',
	styleUrl: './sorting-filtering-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingFilteringSectionComponent {
	// Inject the scoped service for filter popup
	FilterPopupToggleViabilityService = inject(
		FilterPopupToggleViabilityService,
	);
	// getting the state for filter popup
	get isFilterPopupVisible(): boolean {
		return this.FilterPopupToggleViabilityService.isFilterPopupVisible();
	}
	// method for toggle the state for filter popup
	toggleFilterPopup() {
		this.FilterPopupToggleViabilityService.toggleFilterPopup();
	}
}
