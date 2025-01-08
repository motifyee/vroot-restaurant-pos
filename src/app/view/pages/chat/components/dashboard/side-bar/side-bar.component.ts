import {
	ChangeDetectionStrategy,
	Component,
	signal,
	Output,
	EventEmitter,
} from '@angular/core';
import { AllConversationsIconComponent } from '../icons/all-conversations-icon.component';
import { MentionsIconComponent } from '../icons/Mentions-icon.component';
import { UnattendedIconComponent } from '../icons/Unattended-icon.component';
import { CloudIconComponent } from '../icons/cloud-icon.component';
import { AddNewLabelPopupComponent } from './components/add-new-label-popup/add-new-label-popup.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'side-bar',
	standalone: true,
	imports: [
		AllConversationsIconComponent,
		MentionsIconComponent,
		UnattendedIconComponent,
		CloudIconComponent,
		AddNewLabelPopupComponent,
		Dialog,
		ButtonModule,
		InputTextModule,
	],

	templateUrl: './side-bar.component.html',
	styleUrl: './side-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
	isLabelDialogVisible = signal(false);

	toggleLabelDialogVisibility() {
		this.isLabelDialogVisible.set(!this.isLabelDialogVisible());
	}
}
