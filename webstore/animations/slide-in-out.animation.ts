import { animate, style, transition, trigger } from '@angular/animations';

const visible = style({ transform: 'translateX(0)' });
const hidden = style({ transform: 'translateX(100%)' });
const timing = '300ms ease-in-out';

export const slideInOut = trigger('slideInOut', [
	transition(':enter', [hidden, animate(timing, visible)]),
	transition(':leave', [animate(timing, hidden)]),
]);
