import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent {

}
