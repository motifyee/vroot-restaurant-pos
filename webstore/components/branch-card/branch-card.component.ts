import {
	ChangeDetectionStrategy,
	Component,
	input,
	signal,
} from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { OrderTimeComponent } from './order-time/order-time.component';
import { scaleInOut } from '../../animations/scale-in-out.animation';

@Component({
	selector: 'branch-card',
	standalone: true,
	imports: [SkeletonModule, OrderTimeComponent],
	templateUrl: './branch-card.component.html',
	styleUrl: './branch-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [scaleInOut],
})
export class BranchCardComponent {
	branch = input<Branch>();
	isOrderTimeVisible = signal(false);
}
