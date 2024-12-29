import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

interface Status {
	name: string;
}

interface Options {
	name: string;
}

@Component({
	selector: 'sort-popover',
	imports: [
		Select,
		CommonModule,
		FormsModule,
		InputGroupAddonModule,
		ButtonModule,
		InputTextModule,
	],
	templateUrl: './sort-popover.component.html',
	styleUrl: './sort-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortPopoverComponent implements OnInit {
	status: Status[] | undefined;
	selectedStatus: Status | undefined;

	options: Options[] | undefined;
	selectedOptions: Options | undefined;

	ngOnInit() {
		this.status = [
			{ name: 'Open' },
			{ name: 'Resolved' },
			{ name: 'Pending' },
			{ name: 'Resolved' },
			{ name: 'All' },
		];

		this.options = [
			{ name: 'Last activity: Oldest first' },
			{ name: 'Last activity: Newest first' },
			{ name: 'Created at: Newest first' },
			{ name: 'Created at: Oldest first' },
			{ name: 'Priority: Highest first' },
			{ name: 'Priority: Lowest first' },
			{ name: 'Pending Response: Longest first' },
			{ name: 'Pending Response: Shortest first' },
		];
	}
}
