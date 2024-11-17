// scroll.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToSectionSource = new Subject<string>();
  scrollToSection$ = this.scrollToSectionSource.asObservable();

  scrollToSection(categoryId: string) {
    this.scrollToSectionSource.next(categoryId);
  }
}




