import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'mentions-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/mentions.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsIconComponent {}
