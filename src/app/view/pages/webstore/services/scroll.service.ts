// scroll.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable()
export class ScrollService {
	headerEl?: HTMLElement;
	inViewCategory = signal(-1, {
		equal: () => false, // to always react to updates wheter changed or not
	});
}
