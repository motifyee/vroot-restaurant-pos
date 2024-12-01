import { computed } from '@angular/core';
import { signalStoreFeature, withComputed } from '@ngrx/signals';
import { Translator } from '@src/app/core';

export const withTranslator = <_>(
	languages: {
		[key: string]: () => Promise<any>;
	},
	resetTranslations = true,
	followChange = false,
) =>
	signalStoreFeature(
		// used a computed to create translator in an injection context
		// must be called from within the component tree to initialize translation bindings
		withComputed((store) => {
			const tr = new Translator(languages, {
				resetTranslations,
				followChange,
			});
			return {
				tr: computed(() => tr),
			};
		}),
	);
