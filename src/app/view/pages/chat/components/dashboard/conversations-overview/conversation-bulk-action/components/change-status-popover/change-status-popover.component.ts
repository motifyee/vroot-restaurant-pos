import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	ViewChild,
} from '@angular/core';
import { Popover } from 'primeng/popover';
import { PopoverHeaderComponent } from '../popover-header/popover-header.component';
import { Button } from 'primeng/button';

@Component({
	selector: 'change-status-popover',
	imports: [PopoverHeaderComponent, Button],
	templateUrl: './change-status-popover.component.html',
	styleUrl: './change-status-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeStatusPopoverComponent {
	// for hiding the popover
	@Output() closePopover = new EventEmitter<void>();
	onClosePopover(): void {
		this.closePopover.emit();
	}
}
