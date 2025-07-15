import { Plugin } from 'vite';

export function vitePluginDsMaterialIconsFont(): Plugin {
	return {
		name: 'vite-plugin-ds-material-icons-font',
		transformIndexHtml(html) {
			return {
				html,
				tags: [
					{
						tag: 'link',
						attrs: {
							rel: 'preload',
							href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0..1,0',
							as: 'style',
							onload: "this.onload=null;this.rel='stylesheet'",
						},
						injectTo: 'head',
					},
					{
						tag: 'link',
						attrs: {
							rel: 'preload',
							href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,400,0..1,0',
							as: 'style',
							onload: "this.onload=null;this.rel='stylesheet'",
						},
						injectTo: 'head',
					},
					{
						tag: 'noscript',
						children: `
							<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" />
							<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Symbols+Rounded" />
						`.trim(),
						injectTo: 'head',
					},
				],
			};
		},
	};
}
