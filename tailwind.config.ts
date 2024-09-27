import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},

	plugins: [typographyPlugin]
} as Config;
