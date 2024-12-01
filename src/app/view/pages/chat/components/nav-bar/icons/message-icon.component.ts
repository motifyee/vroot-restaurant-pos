import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'message-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/message.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageIconComponent {}
