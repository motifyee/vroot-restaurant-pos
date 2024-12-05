import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConversationsOverviewComponent } from '../../components/dashboard/conversations-overview/conversations-overview/conversations-overview.component';
import { ConversationDetailsComponent } from '../../components/dashboard/conversations-overview/conversation-details/conversation-details.component';

@Component({
	selector: 'dashboard',
	standalone: true,
	imports: [ConversationsOverviewComponent, ConversationDetailsComponent],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
