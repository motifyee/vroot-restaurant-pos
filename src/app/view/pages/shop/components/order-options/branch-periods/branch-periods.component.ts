import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: 'app-branch-periods',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './branch-periods.component.html',
  styleUrls: ['./branch-periods.component.scss']
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
