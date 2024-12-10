import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'appearance-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/appearance.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceIconComponent {}
