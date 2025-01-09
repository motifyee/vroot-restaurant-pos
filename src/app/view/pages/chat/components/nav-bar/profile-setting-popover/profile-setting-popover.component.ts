import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoreInfoIconComponent } from '../icons/more-info-icon.component';
import { KeyboardIconComponent } from '../icons/keyboard-icon.component';
import { userIconComponent } from '../icons/user-icon.component';
import { AppearanceIconComponent } from '../icons/appearance-icon.component';
import { PowerIconComponent } from '../icons/power-icon.component';
import { KeyboardShortcutsPopoverComponent } from '../components/keyboard-shortcuts-popover/keyboard-shortcuts-popover.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
	selector: 'profile-setting-popover',
	imports: [
		MoreInfoIconComponent,
		KeyboardIconComponent,
		userIconComponent,
		AppearanceIconComponent,
		PowerIconComponent,
		KeyboardShortcutsPopoverComponent,
		Dialog,
		ButtonModule,
		InputTextModule,
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
