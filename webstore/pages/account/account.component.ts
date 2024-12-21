import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'my-account',
	standalone: true,
	imports: [],
	templateUrl: './account.component.html',
	styleUrl: './account.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {}
