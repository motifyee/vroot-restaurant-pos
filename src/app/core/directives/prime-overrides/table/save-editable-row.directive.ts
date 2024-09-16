import {
	Directive,
	HostListener,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { EditableRow, Table } from 'primeng/table';

@Directive({
	selector: '[vrSaveEditableRow]',
	standalone: true,
})
export class SaveEditableRowDirective implements OnChanges {
	@Input() vrSaveEditableRow?: boolean;
	dt;
	editableRow;
	constructor(dt: Table, editableRow: EditableRow) {
		this.dt = dt;
		this.editableRow = editableRow;
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.vrSaveEditableRow && this.saveEditableRow();
	}

	// @HostBinding('class')
	// get cls(): string {
	// 	return this.vrSaveEditableRow ? 'red' : '';
	// }

	@HostListener('click', ['$event'])
	onClick(event: Event) {
		event.preventDefault();
	}

	saveEditableRow() {
		this.dt.saveRowEdit(
			this.editableRow.data,
			this.editableRow.el.nativeElement,
		);
	}
}
