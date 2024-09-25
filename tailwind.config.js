/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'*.{html, ts}',
		'./src/**/*.{html, ts, scss}',
		'./src/**/*.component.{html, ts, scss}',
	],
	corePlugins: {
		preflight: false,
	},
	important: false,
	theme: {
		extend: {
			gridTemplateColumns: {
				'products-sm': 'repeat(auto-fit, minmax(8rem, 1fr))',
				'products-lg': 'repeat(auto-fit, minmax(10rem, 1fr))',
			},
		},
	},
	plugins: [],
	safelist: ['border-2'],
};
