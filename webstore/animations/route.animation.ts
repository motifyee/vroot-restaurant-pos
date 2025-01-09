// https://v17.angular.io/guide/route-animations

import { animate } from '@angular/animations';
import { animateChild } from '@angular/animations';
import { group, query, style } from '@angular/animations';
import { transition } from '@angular/animations';
import { trigger } from '@angular/animations';

export const routeAnimation = trigger('routeAnimations', [
	transition('products-page <=> page-in-out', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
			}),
		]),
		query(':enter', [style({ left: '-100%' })], { optional: true }),
		query(':leave', animateChild(), { optional: true }),
		group([
			query(
				':leave',
				[animate('300ms ease-out', style({ left: '100%' }))],
				{ optional: true },
			),
			query(
				':enter',
				[animate('300ms ease-out', style({ left: '0%' }))],
				{ optional: true },
			),
		]),
	]),
	// transition('* <=> *', [
	// 	style({ position: 'relative' }),
	// 	query(
	// 		':enter, :leave',
	// 		[
	// 			style({
	// 				position: 'absolute',
	// 				top: 0,
	// 				left: 0,
	// 				width: '100%',
	// 			}),
	// 		],
	// 		{ optional: true },
	// 	),
	// 	query(':enter', [style({ left: '-100%' })], { optional: true }),
	// 	query(':leave', animateChild(), { optional: true }),
	// 	group([
	// 		query(
	// 			':leave',
	// 			[
	// 				animate(
	// 					'200ms ease-out',
	// 					style({ left: '100%', opacity: 0 }),
	// 				),
	// 			],
	// 			{ optional: true },
	// 		),
	// 		query(
	// 			':enter',
	// 			[animate('300ms ease-out', style({ left: '0%' }))],
	// 			{ optional: true },
	// 		),
	// 		query('@*', animateChild(), { optional: true }),
	// 	]),
	// ]),
]);
