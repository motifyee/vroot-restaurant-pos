import { BranchPeriodsComponent } from "../branch-periods/branch-periods.component";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-drive',
  standalone: true,
  imports: [CommonModule, FormsModule,BranchPeriodsComponent],

  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss'] // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class DriveComponent {
  showBranchPeriods: boolean = false; // Initially set to false

  // Method to toggle the visibility of BranchPeriodsComponent
  toggleBranchPeriods() {
    this.showBranchPeriods = !this.showBranchPeriods; // Toggle visibility
  }
}
