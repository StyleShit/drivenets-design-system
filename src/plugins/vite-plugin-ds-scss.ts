import { Plugin } from 'vite';
import path from 'path';

interface VitePluginDsScssOptions {
	projectRoot?: string;
}

export function vitePluginDsScss({ projectRoot = process.cwd() }: VitePluginDsScssOptions = {}): Plugin {
	return {
		name: 'vite-plugin-ds-scss',
		config() {
			return {
				resolve: {
					alias: {
						'@design-system/ui': path.resolve(projectRoot, 'libs/web/src'),
					},
				},
				css: {
					preprocessorOptions: {
						scss: {
							loadPaths: [path.resolve(projectRoot, 'libs/web/src/styles')],
							additionalData: '@use "@design-system/ui/styles/styles.scss" as *;',
						},
					},
				},
			};
		},
	};
}
