/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'*.{html, ts}',
		'./src/**/*.{html, ts, scss}',
		'./src/**/*.component.{html, ts, scss}',
		'./webstore/**/*.{html, ts, scss}',
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
			backgroundColor: {
				white: '#ffffff',
				transparent: 'transparent',
				'slate-25': '#f7f7fa',
				'slate-50': '#f0f0f2',
				'green-500': '#22C55E',
				'slate-700': '#5a6169',
				'slate-800': '#292b2e',
				'slate-900': '#101012',
				'dark-slate-700': '#5a6169',
			},
			textColor: {
				'slate-800': '#1E293B',
				'slate-400': '#94A3B8',
				'slate-100': '#F1F5F9',
				'slate-200': '#E2E8F0',
				'slate-300': '#CBD5E1',
				'slate-500': '#64748B',
				'slate-600': '#5f636b',
				'black-900': '#000000',
				'slate-7000': '#10151a',
				'woot-500 ': '#3b9eff',
			},
			borderColor: {
				'slate-50': '#F8FAFC',
				'slate-75': '#e8e9ed',
				'gray-300': '#D1D5DB',
				transparent: 'transparent',
				'slate-300': '#D1D5DB',
				'dark-slate-500': '#64748B',
			},
			spacing: {
				0.5: '0.125rem',
				1.5: '0.375rem',
			},
			minWidth: {
				'1rem': '1rem',
			},
			fontSize: {
				sm: '0.875rem',
				xxs: '0.625rem',
			},
			fontWeight: {
				medium: '500',
			},
			borderWidth: {
				'b-2': '2px',
			},
			textTransform: {
				uppercase: 'uppercase',
			},
			hover: {
				'bg-gray-300': '#D1D5DB',
			},
			active: {
				'bg-stone-200': '#E7E5E4',
			},
		},
	},
	plugins: [],
	safelist: ['border-2'],
};
