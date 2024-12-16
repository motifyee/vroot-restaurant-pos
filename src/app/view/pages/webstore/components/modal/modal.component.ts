import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	input,
	Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'modal',
	standalone: true,
	imports: [ToastModule, ButtonModule, NgClass],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	@Output() onDismissed = new EventEmitter<void>();
	isLoading = input(false);
	closable = input(true);
	header = input<string>('');
	floatingHeader = input<boolean>(false);

	top = input<string | undefined>(undefined);

	width = input<string | undefined>(undefined);
	maxWidth = input<string | undefined>(undefined);
	height = input<string | undefined>(undefined);
	maxHeight = input<string | undefined>(undefined);
}
