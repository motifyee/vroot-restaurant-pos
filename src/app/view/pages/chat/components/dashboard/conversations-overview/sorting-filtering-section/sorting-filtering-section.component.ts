import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';

import { SortIconComponent } from '../../icons/sort-icon.component';
import { FilterIconComponent } from '../../icons/filter-icon.component';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';
import { FilterPopupToggleViabilityService } from '../../../../services/dashboard/filter-popup-toggle-viability.service';
import { Popover } from 'primeng/popover';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface City {
	name: string;
	code: string;
}
@Component({
	selector: 'sorting-filtering-section',
	imports: [
		SortIconComponent,
		FilterIconComponent,
		FilterPopupComponent,
		Popover,
		//InputGroup,
		InputGroupAddonModule,
		ButtonModule,
		InputTextModule,
		CommonModule,
		Select,
		FormsModule,
	],
	templateUrl: './sorting-filtering-section.component.html',
	styleUrl: './sorting-filtering-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingFilteringSectionComponent implements OnInit {
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

	cities: City[] | undefined;
	selectedCity: City | undefined;

	ngOnInit() {
		this.cities = [
			{ name: 'Open ', code: '1' },
			{ name: 'Resolved', code: '2' },
			{ name: 'Pending', code: '3' },
			{ name: 'Resolved', code: '4' },
			{ name: 'All', code: '5' },
		];
	}
}
