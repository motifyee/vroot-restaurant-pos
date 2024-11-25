import { NgClass, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';

@Component({
	selector: 'sidebar',
	standalone: true,
	imports: [NgClass, CommonModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	@Input() isVisible!: Signal<boolean>;

	@Output() hide = new EventEmitter<void>();
}
