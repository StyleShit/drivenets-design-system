import type { StorybookConfig } from '@storybook/react-vite';
import { vitePluginDsMaterialIconsFont } from '../src/plugins';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
	stories: ['../src/**/!(*.docs).mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/experimental-addon-test',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (config) => {
		if (!Array.isArray(config.plugins)) {
			config.plugins = [];
		}

		config.plugins.push(vitePluginDsMaterialIconsFont() as never);

		// Exclude plugins that clash with Storybook.
		config.plugins = await withoutVitePlugins(config.plugins, ['vite:dts', 'nx-copy-assets-plugin']);

		return config;
	},
};
export default config;
