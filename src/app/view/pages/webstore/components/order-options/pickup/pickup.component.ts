import { Component, inject, OnInit } from '@angular/core';
import { settingsStore } from '@src/app/features/settings';

@Component({
	selector: 'app-pickup',
	standalone: true,
	imports: [],
	templateUrl: './pickup.component.html',
	styleUrl: './pickup.component.scss',
})
export class PickupComponent implements OnInit {
	#settings = inject(settingsStore);
	branches = this.#settings.branches;

	ngOnInit(): void {
		// get branches once and keep them in the store
		if (!this.branches().length) this.#settings.getBranches();
	}
}
