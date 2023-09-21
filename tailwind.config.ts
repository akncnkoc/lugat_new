import type { Config } from 'tailwindcss'

export default {
	content: ['./resources/views/app.blade.php', './resources/app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			zIndex: {
				1000: '1000',
				2000: '2000',
				5000: '5000',
				5050: '5050',
			},
			colors: {
				blue: {
					50: '#F0F6FF',
					100: '#CFDFF7',
					200: '#9FBFF0',
					300: '#6E9FE8',
					400: '#3E7FE1',
					500: '#005CE8',
					600: '#0B4CAE',
					700: '#083982',
					800: '#062657',
					900: '#03132B',
				},
				gray: {
					50: '#F5F6F7',
					100: '#E5E7E8',
					200: '#CACFD1',
					300:'#B0B7BA',
					400:'#959FA3',
					500:'#7B878C',
					600:'#626C70',
					700:'#4A5154',
					800:'#313638',
					900:'#191B1C',
				}
			},
		},
	},
	plugins: [],
} satisfies Config
