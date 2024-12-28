import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AllConversationsIconComponent } from '../icons/all-conversations-icon.component';
import { MentionsIconComponent } from '../icons/Mentions-icon.component';
import { PlusIconComponent } from '../icons/plus-icon.component';
import { UnattendedIconComponent } from '../icons/Unattended-icon.component';
import { CloudIconComponent } from '../icons/cloud-icon.component';
import { AddNewLabelPopupComponent } from './components/add-new-label-popup/add-new-label-popup.component';
@Component({
	selector: 'side-bar',
	standalone: true,
	imports: [
		AllConversationsIconComponent,
		MentionsIconComponent,
		PlusIconComponent,
		UnattendedIconComponent,
		CloudIconComponent,
		// AddNewLabelPopupComponent,
	],
	templateUrl: './side-bar.component.html',
	styleUrl: './side-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {}
