import { RuleTester } from '@typescript-eslint/rule-tester';
import { requireFigmaTemplate } from '../require-figma-template';

const ruleTester = new RuleTester();

ruleTester.run('require-figma-template', requireFigmaTemplate, {
	valid: [
		{
			name: 'inline export with satisfies',
			code: `
				export default {
					example: figma.code\`<DsDivider />\`,
					imports: ["import { DsDivider } from '@drivenets/design-system';"],
					id: 'ds-divider',
				} satisfies figma.Template;
			`,
		},

		{
			name: 'variable with satisfies',
			code: `
				const template = {
					id: 'ds-divider',
				} satisfies figma.Template;

				export default template;
			`,
		},

		{
			name: 'satisfies on the export of a variable',
			code: `
				const template = {
					id: 'ds-divider',
				};

				export default template satisfies figma.Template;
			`,
		},
	],

	invalid: [
		{
			name: 'inline export without satisfies',
			code: `
				export default {
					id: 'ds-divider',
				};
			`,
			output: `
				export default {
					id: 'ds-divider',
				} satisfies figma.Template;
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 2,
					endLine: 4,
					column: 20,
					endColumn: 6,
				},
			],
		},

		{
			name: 'variable without satisfies',
			code: `
				const template = {
					id: 'ds-divider',
				};

				export default template;
			`,
			output: `
				const template = {
					id: 'ds-divider',
				} satisfies figma.Template;

				export default template;
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 2,
					endLine: 4,
					column: 22,
					endColumn: 6,
				},
			],
		},

		{
			name: 'satisfies with the wrong type',
			code: `
				export default {
					id: 'ds-divider',
				} satisfies Template;
			`,
			output: `
				export default {
					id: 'ds-divider',
				} satisfies figma.Template;
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 4,
					endLine: 4,
					column: 17,
					endColumn: 25,
				},
			],
		},

		{
			name: 'satisfies with a different namespaced type',
			code: `
				export default {
					id: 'ds-divider',
				} satisfies foo.Template;
			`,
			output: `
				export default {
					id: 'ds-divider',
				} satisfies figma.Template;
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 4,
					endLine: 4,
					column: 17,
					endColumn: 29,
				},
			],
		},

		{
			name: 'as assertion instead of satisfies - not fixable',
			code: `
				export default {
					id: 'ds-divider',
				} as figma.Template;
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 2,
					endLine: 4,
					column: 20,
					endColumn: 24,
				},
			],
		},

		{
			name: 'default exported function - not fixable',
			code: `
				export default function template() {
					return { id: 'ds-divider' };
				}
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 2,
					endLine: 4,
					column: 20,
					endColumn: 6,
				},
			],
		},

		{
			name: 'exported identifier that is not a variable - not fixable',
			code: `
				function template() {}

				export default template;
			`,
			errors: [
				{
					messageId: 'requireFigmaTemplateType',
					line: 4,
					endLine: 4,
					column: 20,
					endColumn: 28,
				},
			],
		},

		{
			name: 'file without a default export',
			code: `
				export const template = {
					id: 'ds-divider',
				};
			`,

			errors: [
				{
					messageId: 'requireFigmaTemplate',
					line: 1,
					endLine: 1,
					column: 1,
					endColumn: 2,
				},
			],
		},
	],
});
