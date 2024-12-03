import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'conversation-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/conversation.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationIconComponent {}
