import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'branch-schedule',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './branch-schedule.component.html',
	styleUrls: ['./branch-schedule.component.scss'],
})
export class BranchPeriodsComponent {
	showModal: boolean = true; // Initial state, modal is visible
	activeTab: string = 'الثلاثاء'; // Default active tab

	// Method to close the modal
	closeModal() {
		this.showModal = false;
	}

	// Method to change the active tab
	setActiveTab(tab: string) {
		this.activeTab = tab;
	}
}
