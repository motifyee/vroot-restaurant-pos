import { inject } from '@angular/core';
import {
	InterpolatableTranslationObject,
	TranslateService,
} from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';

// use only in injection context
export class Translator {
	tr = inject(TranslateService);

	constructor(
		public loader: { [key: string]: () => Promise<any> },
		reset = true,
	) {
		this.use(this.tr.currentLang || this.tr.defaultLang, reset);
	}

	use(
		lang: string,
		reset: boolean = true,
	): Observable<InterpolatableTranslationObject> {
		if (!this.loader[lang]) return of({});

		const subject = new Subject<InterpolatableTranslationObject>();

		this.loader[lang]()
			.then((data) => {
				const old = reset ? {} : this.tr.translations[lang];

				this.tr.setTranslation(lang, { ...old, ...data });

				this.tr.use(lang).subscribe((trObj) => {
					subject.next(trObj);
					subject.complete();
				});
			})
			.catch(subject.error);

		return subject.asObservable();
	}

	get currentLang() {
		return this.tr.currentLang || this.tr.defaultLang;
	}

	get = this.tr.get.bind(this.tr);
	getBrowserCultureLang = this.tr.getBrowserCultureLang.bind(this.tr);
	getBrowserLang = this.tr.getBrowserLang.bind(this.tr);
	getLangs = this.tr.getLangs.bind(this.tr);
	getParsedResult = this.tr.getParsedResult.bind(this.tr);
	getStreamOnTranslationChange = this.tr.getStreamOnTranslationChange.bind(
		this.tr,
	);
	instant = this.tr.instant.bind(this.tr);
	reloadLang = this.tr.reloadLang.bind(this.tr);
	resetLang = this.tr.resetLang.bind(this.tr);
	set = this.tr.set.bind(this.tr);
	setDefaultLang = this.tr.setDefaultLang.bind(this.tr);
	setTranslation = this.tr.setTranslation.bind(this.tr);
	stream = this.tr.stream.bind(this.tr);
}