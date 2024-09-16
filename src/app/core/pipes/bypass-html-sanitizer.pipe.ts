import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'bypassHtmlSanitizer', standalone: true })
export class BypassHtmlSanitizerPipe implements PipeTransform {
	// eslint-disable-next-line no-unused-vars
	constructor(private sanitizer: DomSanitizer) {}

	transform(html: string): SafeHtml {
		if (!html) return html;
		if (typeof html !== 'string') return html;

		return this.sanitizer.bypassSecurityTrustHtml(html);
	}
}
