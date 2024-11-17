import { NgClass, CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() isVisible!: Signal<boolean>;

  get isVisibleState(): boolean {
    return this.isVisible();
  }


@Input() toggleVisibility!: () => void; // Function to toggle visibility of ChildTwo

	onButtonClick() {
	  this.toggleVisibility(); // Call the parent's toggle method when button is clicked
	}
}
