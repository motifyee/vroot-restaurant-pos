import {
	ChangeDetectionStrategy,
	Component,
	Output,
	EventEmitter,
} from '@angular/core';
import { DismissIconComponent } from '../../../../nav-bar/icons/dismiss-icon.component';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'add-new-label-popup',
	standalone: true,
	imports: [DismissIconComponent, ColorPicker, FormsModule, InputTextModule],
	templateUrl: './add-new-label-popup.component.html',
	styleUrl: './add-new-label-popup.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewLabelPopupComponent {
	color: string | undefined;

	@Output() toggleVisibility = new EventEmitter<void>();

	onToggleVisibility() {
		this.toggleVisibility.emit();
	}
}
