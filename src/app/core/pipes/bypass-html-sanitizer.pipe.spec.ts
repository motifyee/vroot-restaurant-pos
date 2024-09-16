import { DomSanitizer, ɵDomSanitizerImpl } from '@angular/platform-browser';
import { BypassHtmlSanitizerPipe } from './bypass-html-sanitizer.pipe';

describe('BypassHtmlSanitizerPipe', () => {
	it('create an instance', () => {
		const ds: DomSanitizer = new ɵDomSanitizerImpl('');

		const pipe = new BypassHtmlSanitizerPipe(ds);
		expect(pipe).toBeTruthy();
	});
});
