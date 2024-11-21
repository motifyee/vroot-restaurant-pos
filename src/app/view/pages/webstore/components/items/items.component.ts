
// items.component.ts
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ScrollService } from '../../services/scroll.service'; // Import your scroll service
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent implements OnInit, OnDestroy {
  private scrollSubscription!: Subscription;

  constructor(private scrollService: ScrollService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Subscribe to the scroll service to respond to scrollToSection events
    this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(
      (categoryId) => this.scrollToCategory(categoryId)
    );
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe(); // Cleanup subscription
  }

  // Function to scroll to a specific category section
  private scrollToCategory(categoryId: string) {
    const element = document.getElementById(categoryId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const baseOffset = window.innerWidth < 768 ? 50 : 125; // Adjust offset for mobile/tablet
      const offsetPosition = Math.max(elementPosition - baseOffset - 100, 0); // Add extra offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  @Input() toggleVisibility!: () => void; // Function to toggle visibility of ChildTwo
  onButtonClick() {
    this.toggleVisibility(); // Call the parent's toggle method when button is clicked
    console.log('details');
  }
}
