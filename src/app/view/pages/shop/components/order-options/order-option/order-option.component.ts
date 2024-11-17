import { CommonModule } from '@angular/common';
import { Component, Input, Signal, OnInit } from '@angular/core';
import { PickupComponent } from '../pickup/pickup.component';
import { DeliveryComponent } from "../delivery/delivery.component";
import { DriveComponent } from "../drive/drive.component";
import { PhonePopupComponent } from "../phone-popup/phone-popup.component";
import { CodeVerificationComponent } from "../code-verification/code-verification.component";

@Component({
  selector: 'app-order-option',
  standalone: true,
  imports: [CommonModule, PickupComponent, DeliveryComponent, DriveComponent, PhonePopupComponent, CodeVerificationComponent],
  templateUrl: './order-option.component.html',
  styleUrls: ['./order-option.component.scss']
})
export class OrderOptionComponent implements OnInit {
	activeTab: string = 'delivery'; // Set initial active tab
	hasRenderedOnce = false; // Flag to control initial animation

	@Input() isOrderOptionsVisible!: Signal<boolean>;

	get isVisibleState(): boolean {
	  return this.isOrderOptionsVisible();
	}

	@Input() toggleOrderOptionsVisibility!: () => void; // Function to toggle visibility

	setActiveTab(tab: string) {
	  this.activeTab = tab;
	}

	onButtonClick() {
	  this.toggleOrderOptionsVisibility();
	  console.log("details");
	}

	ngOnInit() {
	  // Delay setting `hasRenderedOnce` to true to prevent the hide animation on initial load
	  setTimeout(() => {
		this.hasRenderedOnce = true;
	  }, 0); // Sets the flag after the initial render cycle
	}
  }
