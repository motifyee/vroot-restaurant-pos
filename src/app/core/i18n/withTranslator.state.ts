import { computed } from '@angular/core';
import { signalStoreFeature, withComputed } from '@ngrx/signals';
import { Translator } from '@src/app/core';

export const withTranslator = <_>(
	languages: {
		[key: string]: () => Promise<any>;
	},
	reset = true,
) =>
	signalStoreFeature(
		// used a computed to create translator in an injection context
		// must be called from within the component tree to initialize translation bindings
		withComputed((store) => {
			const tr = new Translator(languages, reset);
			return {
				tr: computed(() => tr),
			};
		}),
	);
