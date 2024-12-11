import { animate, style, transition, trigger } from '@angular/animations';

const visible = style({ opacity: 1, transform: 'scale(1) translateY(0)' });
const hidden = style({ opacity: 0, transform: 'scale(0.8) translateY(100%)' });
const timing = '300ms ease-in-out';

export const float = trigger('float', [
	transition(':enter', [hidden, animate(timing, visible)]),
	transition(':leave', [visible, animate(timing, hidden)]),
]);
