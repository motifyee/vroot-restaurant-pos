import { NgClass, CommonModule } from '@angular/common';
import { Component, Input, Signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-time',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './order-time.component.html',
  styleUrls: ['./order-time.component.scss'] // Note corrected property name to `styleUrls`
})
export class OrderTimeComponent implements OnInit {

  @Input() isOrderTimeVisible!: Signal<boolean>;

  // New flag to control the initial render
  hasRenderedOnce = false;

  ngOnInit(): void {
    // Delay setting `hasRenderedOnce` to true to avoid triggering the `hide` class on initial render
    setTimeout(() => {
      this.hasRenderedOnce = true;
    }, 0); // This sets the flag after the initial render cycle
  }

  get isVisibleState(): boolean {
    return this.isOrderTimeVisible();
  }

  @Input() toggleOrderTimeVisibility!: () => void; // Function to toggle visibility

  onButtonClick() {
    this.toggleOrderTimeVisibility(); // Call the parent's toggle method when button is clicked
    console.log("details");
  }
}
