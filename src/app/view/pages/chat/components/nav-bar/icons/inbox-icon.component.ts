import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'inbox-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/inbox.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxIconComponent {}
