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
	important: true,
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: ['border-2'],
};
