import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
@Component({
	selector: 'team-popover',
	imports: [FormsModule, SelectModule],
	templateUrl: './team-popover.component.html',
	styleUrl: './team-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamPopoverComponent implements OnInit {
	teams: any[] | undefined;
	selectedTeam: string | undefined;

	ngOnInit() {
		this.teams = [
			{ name: 'John Doe', id: 'A1' },
			{ name: 'Jane Smith', id: 'A2' },
			{ name: 'Mike Brown', id: 'A3' },
			{ name: 'Emily Davis', id: 'A4' },
			{ name: 'Chris Wilson', id: 'A5' },
		];
	}
}
