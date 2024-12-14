import { DismissIconComponent } from '../../../nav-bar/icons/dismiss-icon.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FilterPopupToggleViabilityService } from './../../../../services/dashboard/filter-popup-toggle-viability.service';
@Component({
	selector: 'filter-popup',
	standalone: true,
	imports: [DismissIconComponent],
	templateUrl: './filter-popup.component.html',
	styleUrl: './filter-popup.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPopupComponent {
	// Inject the scoped service for filter popup
	private filterPopupToggleViabilityService = inject(
		FilterPopupToggleViabilityService,
	);

	// method for toggle the state for filter popup
	toggleFilterPopup() {
		this.filterPopupToggleViabilityService.toggleFilterPopup();
	}
}
