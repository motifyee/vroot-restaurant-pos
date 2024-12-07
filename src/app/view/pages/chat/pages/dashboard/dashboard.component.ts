import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsOverviewComponent } from '../../components/dashboard/conversations-overview/conversations-overview/conversations-overview.component';
import { ConversationDetailsComponent } from '../../components/dashboard/conversations-overview/conversation-details/conversation-details.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConversationExpandCollapsService } from '../../services/dashboard/conversation-expand-collaps.service';

@Component({
	selector: 'dashboard',
	standalone: true,
	imports: [CommonModule ,ConversationsOverviewComponent, ConversationDetailsComponent],
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
	// Inject the scoped service
	private ConversationExpandCollapsService = inject(
		ConversationExpandCollapsService,
	);

	// Getter for expanded state
	get isExpanded(): boolean {
		return this.ConversationExpandCollapsService.isConversationsExpanded();
	}

	// Toggle the expanded state of conversations
	toggleExpand(): void {
		this.ConversationExpandCollapsService.toggleExpandConversations();
	}
}
