import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-category-bar',
  standalone: true,
  imports: [],
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss']
})
export class CategoryBarComponent {
  activeCategoryId: string | null = null;

  constructor(private scrollService: ScrollService) {}

  scrollToCategory(categoryId: string) {
    this.activeCategoryId = categoryId;  // Set active category
    this.scrollService.scrollToSection(categoryId);  // Trigger scroll event in the service
  }
}
