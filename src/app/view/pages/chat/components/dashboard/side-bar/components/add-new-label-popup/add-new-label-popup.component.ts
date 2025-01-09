import {
	ChangeDetectionStrategy,
	Component,
	Output,
	EventEmitter,
} from '@angular/core';
import { ColorPicker } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';
import { Button } from 'primeng/button';

@Component({
	selector: 'add-new-label-popup',
	standalone: true,
	imports: [ColorPicker, FormsModule, InputTextModule, Checkbox, Button],
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

	value: string | undefined;
	description: string | undefined;
	checked: boolean = false;
}
