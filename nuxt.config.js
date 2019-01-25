module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: 'Rest My Case',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content:
					'A decentralized infrastructure for bureaucratic commodification'
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	plugins: [
		'plugins/element-ui.js',
		'plugins/faker.js',
		'plugins/chance.js',
		'plugins/VueMomentLib.js'
	],

	/*
	** Customize the progress bar color
	*/
	loading: { color: '#3B8070' },
	/*
	** Build configuration
	*/
	build: {
		vendor: ['web3'],
		/*
		** Run ESLint on save
		*/
		extend(config, { isDev, isClient }) {
			if (isDev && isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/,
					options: {
						fix: true
					}
				})
			}
		}
	},
	srcDir: 'src/',
	rootDir: './'
}
