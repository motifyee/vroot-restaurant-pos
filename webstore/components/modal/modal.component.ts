import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'modal',
	imports: [ButtonModule, NgClass, BgImageComponent],
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	onDismissed = output<void>();

	isLoading = input(false);
	closable = input(true);
	header = input<string>('');
	floatingHeader = input<boolean>(false);
	headerIconUrl = input<string>('');

	top = input<string | undefined>(undefined);

	width = input<string | undefined>(undefined);
	maxWidth = input<string | undefined>(undefined);
	height = input<string | undefined>(undefined);
	maxHeight = input<string | undefined>(undefined);
}
