import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
	selector: 'agent-popover',
	imports: [FormsModule, SelectModule],
	templateUrl: './agent-popover.component.html',
	styleUrl: './agent-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentPopoverComponent implements OnInit {
	agents: any[] | undefined;
	selectedAgent: string | undefined;

	ngOnInit() {
		this.agents = [
			{ name: 'John Doe', id: 'A1' },
			{ name: 'Jane Smith', id: 'A2' },
			{ name: 'Mike Brown', id: 'A3' },
			{ name: 'Emily Davis', id: 'A4' },
			{ name: 'Chris Wilson', id: 'A5' },
		];
	}
}
