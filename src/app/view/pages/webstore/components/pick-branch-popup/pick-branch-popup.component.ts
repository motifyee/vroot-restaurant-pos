import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { settingsStore } from '@src/app/features/settings';

@Component({
	selector: 'pick-branch-popup',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './pick-branch-popup.component.html',
	styleUrls: ['./pick-branch-popup.component.scss'],
})
export class PickBranchPopupComponent {
	settings = inject(settingsStore);
	@Output() onBranchSelected = new EventEmitter<Branch>();
}
