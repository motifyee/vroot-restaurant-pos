import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListIconComponent } from '../../icons/list-icon.component';
import { SearchIconComponent } from '../../icons/search-icon.component';
import { ArrowRightIconComponent } from '../../icons/arrow-right-icon.component';

@Component({
	selector: 'search-bar-section',
	standalone: true,
	imports: [ListIconComponent, ArrowRightIconComponent, SearchIconComponent],
	templateUrl: './search-bar-section.component.html',
	styleUrl: './search-bar-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarSectionComponent {}
