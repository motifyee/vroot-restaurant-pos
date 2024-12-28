import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'primeng/treeselect';

@Component({
	selector: 'label-popover',
	imports: [FormsModule, TreeSelect],
	templateUrl: './label-popover.component.html',
	styleUrl: './label-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelPopoverComponent {
	nodes = [
		{
			key: '0',
			label: 'Documents',
			data: 'Documents Folder',
		},
		{
			key: '1',
			label: 'Work',
			data: 'Work Folder',
		},
		{
			key: '2',
			label: 'Home',
			data: 'Home Folder',
		},
		{
			key: '3',
			label: 'Invoices',
			data: 'Invoices Folder',
		},
	];

	selectedNodes: any;
}
