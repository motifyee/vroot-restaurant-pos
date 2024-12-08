// this service made to manage the state of expanding and collapsing the conversation overview section
// by clicking on the arrow icon in search-bar-section
import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ConversationExpandCollapsService {
	isConversationsExpanded = signal(true);

	toggleExpandConversations() {
		this.isConversationsExpanded.update((state) => !state);
	}
}
