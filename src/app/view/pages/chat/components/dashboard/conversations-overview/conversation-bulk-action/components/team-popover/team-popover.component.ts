import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnInit,
	Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { PopoverHeaderComponent } from '../popover-header/popover-header.component';

@Component({
	selector: 'team-popover',
	imports: [FormsModule, SelectModule, PopoverHeaderComponent],
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

	// for hiding the popover
	@Output() closePopover = new EventEmitter<void>();
	onClosePopover(): void {
		this.closePopover.emit();
	}
}
