import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'notification-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/notification.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationIconComponent {}
