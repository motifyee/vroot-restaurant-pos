import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListIconComponent } from '../../icons/list-icon.component';
import { SearchIconComponent } from '../../icons/search-icon.component';
import { ArrowRightIconComponent } from '../../icons/arrow-right-icon.component';
//services
import { ConversationExpandCollapsService } from '../../../../services/dashboard/conversation-expand-collaps.service';
import { converastionSideBarExpandCollapsService } from '../../../../services/dashboard/converastion-side-bar-expand-collaps.service';

@Component({
	selector: 'search-bar-section',
	standalone: true,
	imports: [ListIconComponent, ArrowRightIconComponent, SearchIconComponent],
	templateUrl: './search-bar-section.component.html',
	styleUrls: ['./search-bar-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarSectionComponent {
	// toggle expand conversation overview
	ConversationExpandCollapsService = inject(ConversationExpandCollapsService);

	toggleExpand() {
		this.ConversationExpandCollapsService.toggleExpandConversations();
	}

	// toggle expand side bar
	converastionSideBarExpandCollapsService = inject(
		converastionSideBarExpandCollapsService,
	);

	ExpandSidebar() {
		this.converastionSideBarExpandCollapsService.toggleExpandSideBar();
	}
}
