import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'popover-header',
	imports: [],
	templateUrl: './popover-header.component.html',
	styleUrl: './popover-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverHeaderComponent {
	@Input() title: string = 'Default Title';
	// @Output() close = new EventEmitter<void>();

	onClose() {
		// this.close.emit();
	}
}
