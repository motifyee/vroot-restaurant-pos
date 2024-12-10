import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'user-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/user.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class userIconComponent {}
