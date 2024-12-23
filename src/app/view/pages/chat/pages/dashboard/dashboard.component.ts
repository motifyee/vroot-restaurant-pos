import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsOverviewComponent } from '../../components/dashboard/conversations-overview/conversations-overview/conversations-overview.component';
import { ConversationDetailsComponent } from '../../components/dashboard/conversation-details/conversation-details.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { SideBarComponent } from '../../components/dashboard/side-bar/side-bar.component';
//services
import { ConversationExpandCollapsService } from '../../services/dashboard/conversation-expand-collaps.service';
import { converastionSideBarExpandCollapsService } from '../../services/dashboard/converastion-side-bar-expand-collaps.service';

@Component({
    selector: 'dashboard',
    imports: [
        CommonModule,
        ConversationsOverviewComponent,
        ConversationDetailsComponent,
        SideBarComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
	// (side-bar)  Inject the scoped service
	private converastionSideBarExpandCollapsService = inject(
		converastionSideBarExpandCollapsService,
	);
	//Getter for expanded state
	get isSideBarExpanded(): boolean {
		return this.converastionSideBarExpandCollapsService.isConverastionSideBarExpand();
	}
	// Toggle the expanded state of conversations
	toggleExpandSideBar(): void {
		this.converastionSideBarExpandCollapsService.toggleExpandSideBar();
	}

	//(coversation) Inject the scoped service
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
