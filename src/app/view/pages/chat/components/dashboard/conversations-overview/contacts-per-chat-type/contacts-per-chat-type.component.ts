import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon.component';
import { ExclamationIconComponent } from '../../icons/exclamation-icon.component';
@Component({
	selector: 'contacts-per-chat-type',
	imports: [ArrowLeftIconComponent, ExclamationIconComponent, CommonModule],
	templateUrl: './contacts-per-chat-type.component.html',
	styleUrl: './contacts-per-chat-type.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsPerChatTypeComponent {
	isContactHovered = signal(false);

	// Dumb data for conversations
	conversations = [
		{
			id: 1,
			name: 'Mohamed Abdo',
			message: 'This is a test message.',
			meta: '9d • 5d',
			unread: 3,
			avatar: 'MA',
			label: 'first',
			labelColor: '#467982',
			checked: false,
			hovered: false,
		},
		{
			id: 2,
			name: 'Fatima Zahra',
			message: 'Another random message here.',
			meta: '1d • 1h',
			unread: 5,
			avatar: 'FZ',
			label: 'urgent',
			labelColor: '#985121',
			checked: false,
			hovered: false,
		},
		{
			id: 3,
			name: 'Ali Hassan',
			message: 'Work meeting tomorrow.',
			meta: '2h • 10m',
			unread: 0,
			avatar: 'AH',
			label: 'work',
			labelColor: '#217896',
			checked: false,
			hovered: false,
		},
	];

	// Method to handle checkbox toggle
	toggleCheckbox(conversation: any) {
		conversation.checked = !conversation.checked;
	}

	// Method to set hover state
	setHoverState(conversation: any, isContactHovered: boolean) {
		conversation.hovered = isContactHovered;
	}
}
