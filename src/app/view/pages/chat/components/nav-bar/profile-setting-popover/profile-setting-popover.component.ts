import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyboardIconComponent } from '../icons/keyboard-icon.component';
import { KeyboardShortcutsPopoverComponent } from '../components/keyboard-shortcuts-popover/keyboard-shortcuts-popover.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
	selector: 'profile-setting-popover',
	imports: [
		KeyboardIconComponent,
		KeyboardShortcutsPopoverComponent,
		Dialog,
		ButtonModule,
		InputTextModule,
		DividerModule,
		ToggleSwitch,
	],
	templateUrl: './profile-setting-popover.component.html',
	styleUrl: './profile-setting-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingPopoverComponent {
	visible: boolean = false;

	showKeyboardShortcutsDialog() {
		this.visible = true;
	}
}
