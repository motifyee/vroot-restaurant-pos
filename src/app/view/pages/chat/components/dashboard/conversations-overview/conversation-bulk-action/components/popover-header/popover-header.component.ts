import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { Button } from 'primeng/button';
@Component({
	selector: 'popover-header',
	imports: [Button],
	templateUrl: './popover-header.component.html',
	styleUrl: './popover-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverHeaderComponent {
	@Input() title: string = 'Default Title';

	// Event to notify the parent to close the popover
	@Output() close = new EventEmitter<void>();

	onClose(): void {
		this.close.emit();
	}
}
