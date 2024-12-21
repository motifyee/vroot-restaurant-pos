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
			backgroundColor: {
				'white': '#ffffff', 
				'transparent': 'transparent', 
				'green-500': '#22C55E', 
				'slate-700': '#5a6169', 
				'slate-800': '#292b2e', 
				'slate-900': '#101012', 
			  },
			  textColor: {
				'slate-800': '#1E293B',
				'slate-400': '#94A3B8',
				'slate-100': '#F1F5F9',
				'slate-200': '#E2E8F0',
				'slate-300': '#CBD5E1',
				'slate-500': '#64748B',
				'black-900': '#000000',
				

			  },
			  borderColor: {
				'slate-50': '#F8FAFC',
				'gray-300': '#D1D5DB',
				'transparent': 'transparent',
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
