import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon.component';
import { ExclamationIconComponent } from '../../icons/exclamation-icon.component';
import { ConversationBulkActionComponent } from '../conversation-bulk-action/conversation-bulk-action.component';

@Component({
	selector: 'contact-list',
	imports: [
		ArrowLeftIconComponent,
		ExclamationIconComponent,
		ConversationBulkActionComponent,
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
