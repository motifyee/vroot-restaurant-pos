import { Component } from '@angular/core';

@Component({
  selector: 'app-dismiss-icon',
  standalone: true,
  template: `
    <svg
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="flex-shrink-0 icon--font dismiss icon"
    >
      <path
        d="m4.397 4.554.073-.084a.75.75 0 0 1 .976-.073l.084.073L12 10.939l6.47-6.47a.75.75 0 1 1 1.06 1.061L13.061 12l6.47 6.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L12 13.061l-6.47 6.47a.75.75 0 0 1-1.06-1.061L10.939 12l-6.47-6.47a.75.75 0 0 1-.072-.976l.073-.084-.073.084Z"
        fill="currentColor"
      ></path>
    </svg>
  `,
})
export class DismissIconComponent {}
