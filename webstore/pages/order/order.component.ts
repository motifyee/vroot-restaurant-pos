import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {

}
