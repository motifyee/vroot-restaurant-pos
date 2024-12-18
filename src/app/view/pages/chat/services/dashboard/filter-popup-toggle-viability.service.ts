// this service made to manage the state of showing and hiding filter popup section
// by clicking on the filter icon in sorting-filtering-section
import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FilterPopupToggleViabilityService {
	isFilterPopupVisible = signal(false);

	toggleFilterPopup() {
		this.isFilterPopupVisible.update((state) => !state);
	}
}
