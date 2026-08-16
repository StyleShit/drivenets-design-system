import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';
import designSystem from '@drivenets/commitlint-plugin-internal';

const hasBreakingChanges = process.env.HAS_BREAKING_CHANGES === 'true';

const config: UserConfig = {
	extends: ['@commitlint/config-conventional'],
	plugins: [designSystem],
	rules: {
		'internal/exclamation-mark': [RuleConfigSeverity.Error, hasBreakingChanges ? 'always' : 'never'],
		'internal/require-jira-ticket': [RuleConfigSeverity.Error, 'always', { prefix: 'AR' }],
	},
};

export default config;
