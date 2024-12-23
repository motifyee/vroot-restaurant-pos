import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoreInfoIconComponent } from "../icons/more-info-icon.component";
import { KeyboardIconComponent } from "../icons/keyboard-icon.component";
import { userIconComponent } from "../icons/user-icon.component";
import { AppearanceIconComponent } from "../icons/appearance-icon.component";
import { PowerIconComponent } from "../icons/power-icon.component";

@Component({
    selector: 'profile-setting-popover',
    imports: [MoreInfoIconComponent, KeyboardIconComponent, userIconComponent, AppearanceIconComponent, PowerIconComponent],
    templateUrl: './profile-setting-popover.component.html',
    styleUrl: './profile-setting-popover.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingPopoverComponent {

}
