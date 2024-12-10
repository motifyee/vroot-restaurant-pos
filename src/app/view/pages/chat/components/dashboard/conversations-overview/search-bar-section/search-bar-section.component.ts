import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListIconComponent } from '../../icons/list-icon.component';
import { SearchIconComponent } from '../../icons/search-icon.component';
import { ArrowRightIconComponent } from '../../icons/arrow-right-icon.component';
import { ConversationExpandCollapsService } from '../../../../services/dashboard/conversation-expand-collaps.service';

@Component({
	selector: 'search-bar-section',
	standalone: true,
	imports: [ListIconComponent, ArrowRightIconComponent, SearchIconComponent],
	templateUrl: './search-bar-section.component.html',
	styleUrls: ['./search-bar-section.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	//   providers: [ConversationExpandCollapsService],
})
export class SearchBarSectionComponent {
	ConversationExpandCollapsService = inject(ConversationExpandCollapsService);

	toggleExpand() {
		this.ConversationExpandCollapsService.toggleExpandConversations();
	}
}
