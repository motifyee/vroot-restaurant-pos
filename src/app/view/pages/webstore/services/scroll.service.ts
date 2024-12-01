// scroll.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable()
export class ScrollService {
	headerEl?: HTMLElement;
	inViewCategory = signal(-1);
}
