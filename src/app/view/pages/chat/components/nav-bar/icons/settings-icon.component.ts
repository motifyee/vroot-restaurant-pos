import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'settings-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/settings.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsIconComponent {}
