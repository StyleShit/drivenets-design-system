import type { StorybookConfig } from '@storybook/react-vite';
import { vitePluginDsMaterialIconsFont } from '../src/plugins';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
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
		return config;
	},
};
export default config;
