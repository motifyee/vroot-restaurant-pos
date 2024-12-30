import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ConversationBulkActionComponent } from '../conversation-bulk-action/conversation-bulk-action.component';
import { CommonModule } from '@angular/common';
import { ContactsPerChatTypeComponent } from '../contacts-per-chat-type/contacts-per-chat-type.component';

@Component({
	selector: 'contact-list',
	imports: [
		ConversationBulkActionComponent,
		CommonModule,
		ContactsPerChatTypeComponent,
	],
	templateUrl: './contact-list.component.html',
	styleUrl: './contact-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
	tabs = [
		{ title: 'mine', value: 5 },
		{ title: 'unassigned', value: 0 },
		{ title: 'all', value: 5 },
	];

	// Signal for active tab
	activeTab = signal(this.tabs[0].title);

	// Method to change the active tab
	setActiveTab(tab: string) {
		this.activeTab.set(tab);
	}
}
