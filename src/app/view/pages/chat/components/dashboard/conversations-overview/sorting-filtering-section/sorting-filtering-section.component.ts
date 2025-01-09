import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { FilterPopupComponent } from '../filter-popup/filter-popup.component';
import { SortPopoverComponent } from '../sort-popover/sort-popover.component';
import { Popover } from 'primeng/popover';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';

@Component({
	selector: 'sorting-filtering-section',
	imports: [
		SortPopoverComponent,
		FilterPopupComponent,
		Popover,
		InputGroupAddonModule,
		ButtonModule,
		InputTextModule,
		CommonModule,
		FormsModule,
		Dialog,
	],
	templateUrl: './sorting-filtering-section.component.html',
	styleUrl: './sorting-filtering-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingFilteringSectionComponent {
	isFilterDialogVisible = signal(false);

	toggleFilterDialogVisibility() {
		this.isFilterDialogVisible.set(!this.isFilterDialogVisible());
	}
}
