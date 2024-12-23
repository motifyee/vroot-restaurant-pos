import { Component, inject, OnInit } from '@angular/core';
import { settingsStore } from '@webstore/state';
import { SkeletonModule } from 'primeng/skeleton';
import { BranchCardComponent } from '../../../branch-card/branch-card.component';

@Component({
    selector: 'app-pickup',
    imports: [SkeletonModule, BranchCardComponent],
    templateUrl: './pickup.component.html',
    styleUrl: './pickup.component.scss'
})
export class PickupComponent implements OnInit {
	#settings = inject(settingsStore);
	branches = this.#settings.branches;

	ngOnInit(): void {
		// get branches once and keep them in the store
		// if (!this.branches().length) this.#settings.getBranches();
	}
}
