import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'keyboard-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/keyboard.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardIconComponent {}
