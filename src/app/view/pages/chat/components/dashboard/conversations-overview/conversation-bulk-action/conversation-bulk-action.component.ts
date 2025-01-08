import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { ChangeStatusPopoverComponent } from './components/change-status-popover/change-status-popover.component';
import { LabelPopoverComponent } from './components/label-popover/label-popover.component';
import { TeamPopoverComponent } from './components/team-popover/team-popover.component';
import { AgentPopoverComponent } from './components/agent-popover/agent-popover.component';
import { Button } from 'primeng/button';

@Component({
	selector: 'conversation-bulk-action',
	imports: [
		Popover,
		ChangeStatusPopoverComponent,
		LabelPopoverComponent,
		TeamPopoverComponent,
		AgentPopoverComponent,
		Button,
	],
	templateUrl: './conversation-bulk-action.component.html',
	styleUrl: './conversation-bulk-action.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationBulkActionComponent {
	@ViewChild('changeStatusPopover') changeStatusPopover?: Popover;

	// method to hide bulk action popovers
	hidePopover(popover: Popover): void {
		if (popover) {
			popover.hide();
		}
	}
}
