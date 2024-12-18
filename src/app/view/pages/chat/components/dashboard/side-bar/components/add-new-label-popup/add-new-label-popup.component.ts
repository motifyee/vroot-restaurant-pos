import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DismissIconComponent } from '../../../../nav-bar/icons/dismiss-icon.component';

@Component({
	selector: 'add-new-label-popup',
	standalone: true,
	imports: [DismissIconComponent],
	templateUrl: './add-new-label-popup.component.html',
	styleUrl: './add-new-label-popup.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewLabelPopupComponent {}
