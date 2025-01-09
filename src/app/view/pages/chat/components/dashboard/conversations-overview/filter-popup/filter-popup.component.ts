import { DismissIconComponent } from '../../../nav-bar/icons/dismiss-icon.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
	selector: 'filter-popup',
	imports: [DismissIconComponent, Button],
	templateUrl: './filter-popup.component.html',
	styleUrl: './filter-popup.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPopupComponent {
	// dropdown options variable
	dropdownOptions = [
		{
			label: 'Standard filters',
			options: [
				{ value: 'status', text: 'Status' },
				{ value: 'assignee_id', text: 'Assignee name' },
				{ value: 'inbox_id', text: 'Inbox name' },
				{ value: 'team_id', text: 'Team name' },
				{ value: 'display_id', text: 'Conversation identifier' },
				{ value: 'campaign_id', text: 'Campaign name' },
				{ value: 'labels', text: 'Labels' },
				{ value: 'created_at', text: 'Created at' },
				{ value: 'last_activity_at', text: 'Last activity' },
			],
		},
		{
			label: 'Additional filters',
			options: [
				{ value: 'browser_language', text: 'Browser language' },
				{ value: 'country_code', text: 'Country name' },
				{ value: 'referer', text: 'Referer link' },
			],
		},
		{
			label: 'Custom attributes',
			options: [],
		},
	];
}
