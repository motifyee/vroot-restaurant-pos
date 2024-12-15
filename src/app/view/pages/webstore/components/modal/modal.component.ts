import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostBinding,
	input,
	OnInit,
	Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { scaleInOut } from '../../animations/scaleInOut.animation';
import { AnimationEvent } from '@angular/animations';

@Component({
	selector: 'modal',
	standalone: true,
	imports: [ToastModule, ButtonModule],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'popup' },
})
export class ModalComponent {
	@Output() onDismissed = new EventEmitter<void>();
	isLoading = input(false);
	closable = input(true);
	header = input<string>('modal');
}
