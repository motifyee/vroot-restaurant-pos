import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'contacts-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/contacts.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsIconComponent {}
