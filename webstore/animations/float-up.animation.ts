import { animate, style, transition, trigger } from '@angular/animations';

const visible = style({ opacity: 1, transform: 'scale(1) translateY(0)' });
const hidden = style({ opacity: 0, transform: 'scale(0.8) translateY(100%)' });
const timing = '300ms ease-in-out';

export const floatUp = trigger('floatUp', [
	transition(':enter', [hidden, animate(timing, visible)]),
	transition(':leave', [animate(timing, hidden)]),
]);

const expandVisible = style({ opacity: 1, 'max-height': '60vh' });
const expandHidden = style({ opacity: 0.8, 'max-height': 0 });
const expandTiming = '300ms ease-in';

export const cartExpandUp = trigger('expandUp', [
	transition(':enter', [expandHidden, animate(expandTiming, expandVisible)]),
	transition(':leave', [animate(expandTiming, expandHidden)]),
]);
