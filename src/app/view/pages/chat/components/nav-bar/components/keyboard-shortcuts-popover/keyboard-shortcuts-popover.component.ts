import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'keyboard-shortcuts-popover',
	imports: [ButtonModule, InputTextModule],
	templateUrl: './keyboard-shortcuts-popover.component.html',
	styleUrl: './keyboard-shortcuts-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardShortcutsPopoverComponent {
	shortcuts = [
		{ description: 'View all shortcuts', keys: ['Win / ⌘', '/'] },
		{ description: 'Open conversation', keys: ['Alt / ⌥', 'J', 'K'] },
		{
			description: 'Resolve and move to next',
			keys: ['Win / ⌘', 'Alt / ⌥', 'E'],
		},
		{ description: 'Navigate dropdown items', keys: ['Up', 'Down'] },
		{ description: 'Resolve Conversation', keys: ['Alt / ⌥', 'E'] },
		{ description: 'Go to Conversation Dashboard', keys: ['Alt / ⌥', 'C'] },
		{ description: 'Add Attachment', keys: ['Alt / ⌥', 'A'] },
		{ description: 'Go to Contacts Dashboard', keys: ['Alt / ⌥', 'V'] },
		{ description: 'Toggle Sidebar', keys: ['Alt / ⌥', 'O'] },
		{ description: 'Go to Reports sidebar', keys: ['Alt / ⌥', 'R'] },
		{
			description: 'Move to next tab in conversation list',
			keys: ['Alt / ⌥', 'N'],
		},
		{ description: 'Go to Settings', keys: ['Alt / ⌥', 'S'] },
		{ description: 'Switch to Private Note', keys: ['Alt / ⌥', 'P'] },
		{ description: 'Switch to Reply', keys: ['Alt / ⌥', 'L'] },
		{ description: 'Toggle snooze dropdown', keys: ['Alt / ⌥', 'M'] },
	];
}
