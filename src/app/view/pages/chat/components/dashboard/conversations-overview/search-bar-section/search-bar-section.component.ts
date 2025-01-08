import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConversationExpandCollapsService } from '../../../../services/dashboard/conversation-expand-collaps.service';
import { converastionSideBarExpandCollapsService } from '../../../../services/dashboard/converastion-side-bar-expand-collaps.service';
import { TooltipModule } from 'primeng/tooltip';
import { Button } from 'primeng/button';

@Component({
	selector: 'search-bar-section',
	imports: [TooltipModule, Button],
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
