import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { ChangeStatusPopoverComponent } from './components/change-status-popover/change-status-popover.component';
import { LabelPopoverComponent } from './components/label-popover/label-popover.component';
import { TeamPopoverComponent } from './components/team-popover/team-popover.component';
import { AgentPopoverComponent } from './components/agent-popover/agent-popover.component';

@Component({
	selector: 'conversation-bulk-action',
	imports: [
		Popover,
		ChangeStatusPopoverComponent,
		LabelPopoverComponent,
		TeamPopoverComponent,
		AgentPopoverComponent,
	],
	templateUrl: './conversation-bulk-action.component.html',
	styleUrl: './conversation-bulk-action.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationBulkActionComponent {
	@ViewChild('changeStatusPopover') changeStatusPopover?: Popover;

	// Method to hide the popover
	hidePopover() {
		if (this.changeStatusPopover) {
			this.changeStatusPopover.hide();
		}
	}
}
