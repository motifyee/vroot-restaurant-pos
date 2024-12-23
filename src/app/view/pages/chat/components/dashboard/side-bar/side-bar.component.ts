import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AllConversationsIconComponent } from "../icons/all-conversations-icon.component";
import { MentionsIconComponent } from "../icons/Mentions-icon.component";
import { PlusIconComponent } from "../icons/plus-icon.component";
import { UnattendedIconComponent } from "../icons/Unattended-icon.component";
import { CloudIconComponent } from "../icons/cloud-icon.component";

@Component({
    selector: 'side-bar',
    imports: [AllConversationsIconComponent, MentionsIconComponent, PlusIconComponent, UnattendedIconComponent, CloudIconComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {

}
