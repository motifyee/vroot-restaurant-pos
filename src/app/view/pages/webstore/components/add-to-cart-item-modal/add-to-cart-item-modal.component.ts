import { NgClass, CommonModule } from '@angular/common';
import { Component, Input, Signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-item-modal',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './add-to-cart-item-modal.component.html',
  styleUrls: ['./add-to-cart-item-modal.component.scss']
})
export class AddToCartItemModalComponent implements OnInit {
  options = [
    { name: 'سلطة ورق عنب', price: 29, checked: false },
    { name: 'سيزر',    price: 24, checked: false },
    { name: 'جرجير',   price: 23, checked: false },
    { name: 'فتوش',    price: 21, checked: false },
    { name: 'يونانية', price: 23, checked: false },
    // Add more options as needed
  ];

  toggleCheck(option: any) {
    option.checked = !option.checked;
  }

  @Input() isVisible!: Signal<boolean>;

  // New flag to control the initial render
  hasRenderedOnce = false;

  ngOnInit(): void {
    // Delay setting the `hasRenderedOnce` to true to avoid triggering the `hide` class on initial render
    setTimeout(() => {
      this.hasRenderedOnce = true;
    }, 0); // This sets the flag after the initial render cycle
  }

  get isVisibleState(): boolean {
    return this.isVisible();
  }

  @Input() toggleVisibility!: () => void; // Function to toggle visibility of ChildTwo

  onButtonClick() {
    this.toggleVisibility(); // Call the parent's toggle method when button is clicked
    console.log("details");
  }
}
