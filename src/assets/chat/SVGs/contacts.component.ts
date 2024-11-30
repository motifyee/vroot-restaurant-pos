import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'contacts',
	standalone: true,
	imports: [],
	template: `
		<svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="">
			<path
				d="M15.5 12.25a.75.75 0 0 0-.75-.75h-5a.75.75 0 0 0-.75.75v.5c0 1 1.383 1.75 3.25 1.75s3.25-.75 3.25-1.75v-.5ZM14 8.745C14 7.78 13.217 7 12.25 7s-1.75.779-1.75 1.745a1.75 1.75 0 1 0 3.5 0ZM4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15Zm1.5 0V18H19V4.5a1 1 0 0 0-1-1H6.5a1 1 0 0 0-1 1Z"
				fill="currentColor"
			></path>
		</svg>
	`,
	styles: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {}
