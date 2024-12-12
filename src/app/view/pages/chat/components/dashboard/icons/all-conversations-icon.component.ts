import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'all-conversations-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/all-conversations.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllConversationsIconComponent {}
