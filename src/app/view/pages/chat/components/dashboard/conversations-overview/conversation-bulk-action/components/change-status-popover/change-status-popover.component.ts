import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	ViewChild,
} from '@angular/core';
import { Popover } from 'primeng/popover';

@Component({
	selector: 'change-status-popover',
	imports: [],
	templateUrl: './change-status-popover.component.html',
	styleUrl: './change-status-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeStatusPopoverComponent {
	@Output() hide = new EventEmitter<void>(); // EventEmitter for hiding the popover

	// Method to emit the hide event
	requestToggle() {
		this.hide.emit(); // Correct usage of emit
	}
}
