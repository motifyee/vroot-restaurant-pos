import {
	ChangeDetectionStrategy,
	Component,
	signal,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearIconComponent } from '../icons/gear-icon.component';
import { DismissIconComponent } from '../icons/dismiss-icon.component';

@Component({
    selector: 'unread-notifications',
    imports: [CommonModule, GearIconComponent, DismissIconComponent],
    templateUrl: './unread-notifications.component.html',
    styleUrl: './unread-notifications.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnreadNotificationsComponent {
	@Input() isVisible: boolean = false;
	@Output() close = new EventEmitter<void>();

	closePopup() {
		this.close.emit();
	}
}
