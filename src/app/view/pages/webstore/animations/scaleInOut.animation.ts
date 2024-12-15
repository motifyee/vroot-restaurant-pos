import {
	animate,
	keyframes,
	style,
	transition,
	trigger,
} from '@angular/animations';

const visible = style({ opacity: 1, transform: 'scale(1) translateY(0)' });
const hidden = style({ opacity: 0, transform: 'scale(0.5) translateY(-50%)' });
const timing = '300ms ease-in-out';

const _keyframes = keyframes([
	style({
		opacity: 0,
		transform: 'scale(0) translateY(-100%)',
		offset: 0,
	}),
	style({
		opacity: 1,
		transform: 'scale(1) translateY(0)',
		offset: 1,
	}),
]);

export const scaleInOut = trigger('scaleInOut', [
	transition(':enter', [hidden, animate(timing, visible)]),
	transition(':leave', [animate(timing, hidden)]),
]);
