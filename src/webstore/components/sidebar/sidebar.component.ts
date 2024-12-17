import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

const visible = style({ transform: 'translateX(0)' });
const hidden = style({ transform: 'translateX(100%)' });
const timing = '300ms ease-in-out';
@Component({
	selector: 'sidebar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
	host: { class: 'popup' },
	animations: [
		trigger('slideInOut', [
			transition(':enter', [hidden, animate(timing, visible)]),
			transition(':leave', [animate(timing, hidden)]),
		]),
	],
})
export class SidebarComponent {
	@HostBinding('@slideInOut') slideInOutAnimation = true;

	@Output() onDismiss = new EventEmitter<void>();

	menuLinks = [
		{ label: 'الصفحة الرئيسية', icon: 'pi pi-home', url: '/' },
		{ label: 'حسابي', icon: 'pi pi-user', url: '/products' },
		{ label: 'الفروع', icon: 'pi pi-building', url: '/branches' },
		{ label: 'English', icon: 'pi pi-language', action: () => {} },
	];
}
