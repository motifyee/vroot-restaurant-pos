import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'branch-card',
	standalone: true,
	imports: [SkeletonModule],
	templateUrl: './branch-card.component.html',
	styleUrl: './branch-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchCardComponent {
	branch = input<Branch>();
}
