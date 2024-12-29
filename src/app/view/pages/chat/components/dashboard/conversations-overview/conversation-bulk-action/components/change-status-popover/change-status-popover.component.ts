import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	ViewChild,
} from '@angular/core';
import { Popover } from 'primeng/popover';
import { PopoverHeaderComponent } from '../popover-header/popover-header.component';

@Component({
	selector: 'change-status-popover',
	imports: [PopoverHeaderComponent],
	templateUrl: './change-status-popover.component.html',
	styleUrl: './change-status-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeStatusPopoverComponent {
	// @Output() hide = new EventEmitter<void>();
	// // Method to emit the hide event
	// requestToggle() {
	// 	this.hide.emit();
	// }
}
