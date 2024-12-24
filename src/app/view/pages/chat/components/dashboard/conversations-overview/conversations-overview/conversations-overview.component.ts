import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { SearchBarSectionComponent } from '../search-bar-section/search-bar-section.component';
import { SortingFilteringSectionComponent } from '../sorting-filtering-section/sorting-filtering-section.component';

@Component({
	selector: 'conversations-overview',
	imports: [
		ContactListComponent,
		SearchBarSectionComponent,
		SortingFilteringSectionComponent,
	],
	templateUrl: './conversations-overview.component.html',
	styleUrls: ['./conversations-overview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsOverviewComponent {}
