import type { Meta, StoryObj } from '@storybook/react';
import DsTypography from './ds-typography';
import styles from './ds-typography.stories.module.scss';
import { SemanticVariant, semanticVariants } from './ds-typography.types';
import { semanticElementMap } from './ds-typography.config';

const meta: Meta<typeof DsTypography> = {
	title: 'Design System/Typography',
	component: DsTypography,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A flexible typography component that supports both semantic variants and granular customization.

## Features
- **Semantic Variants**: Use predefined typography combinations (e.g., \`body-md-reg\`, \`code-xs-semi-bold\`)
- **Granular Customization**: Mix and match size, weight, and alignment properties
- **Semantic HTML**: Automatically renders appropriate HTML elements
- **Composition Support**: Use \`asChild\` for zero-overhead composition
- **TypeScript Support**: Full type safety with proper variant definitions
				`,
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			description: 'Predefined typography combination (overrides size/weight/align)',
			options: semanticVariants,
		},
		asChild: {
			control: 'boolean',
			description: 'Use Slot component for composition',
		},
		children: {
			control: 'text',
			description: 'Content to render',
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsTypography>;

type TypographyClass = {
	name: string;
	className: SemanticVariant;
	description: string;
};

const sampleText = 'Almost before we knew it, we had left the ground.';

export const Default: Story = {
	args: {
		variant: 'body-md-reg',
		children: 'Hello world Design System!',
	},
};

export const Showcase: Story = {
	render: function Render() {
		const typographyClasses: TypographyClass[] = [
			{
				name: 'Heading 1',
				className: 'heading1',
				description: '32px, Semi-bold, -0.01em letter spacing',
			},
			{
				name: 'Heading 2',
				className: 'heading2',
				description: '24px, Semi-bold, -0.01em letter spacing',
			},
			{
				name: 'Heading 3',
				className: 'heading3',
				description: '20px, Semi-bold, -0.01em letter spacing',
			},
			{
				name: 'Heading 4',
				className: 'heading4',
				description: '18px, Semi-bold, -0.01em letter spacing',
			},
			{
				name: 'Body MD Regular',
				className: 'body-md-reg',
				description: '16px, Regular, -0.01em letter spacing',
			},
			{
				name: 'Body MD Semi-bold',
				className: 'body-md-semi-bold',
				description: '16px, Semi-bold, -0.01em letter spacing',
			},
			{
				name: 'Body MD Bold',
				className: 'body-md-bold',
				description: '16px, Bold, -0.01em letter spacing',
			},
			{
				name: 'Body MD Link',
				className: 'body-md-link',
				description: '16px, Regular, -0.01em letter spacing, with underline',
			},
			{
				name: 'Body SM Regular',
				className: 'body-sm-reg',
				description: '14px, Regular, -0.01em letter spacing',
			},
			{
				name: 'Body SM Semi-bold',
				className: 'body-sm-semi-bold',
				description: '14px, Semi-bold, -0.01em letter spacing',
			},
			{
				name: 'Body SM Bold',
				className: 'body-sm-bold',
				description: '14px, Bold, -0.01em letter spacing',
			},
			{
				name: 'Body SM Link',
				className: 'body-sm-link',
				description: '14px, Regular, -0.01em letter spacing, with underline',
			},
			{
				name: 'Body XS Regular',
				className: 'body-xs-reg',
				description: '12px, Regular',
			},
			{
				name: 'Body XS Semi-bold',
				className: 'body-xs-semi-bold',
				description: '12px, Semi-bold',
			},
			{
				name: 'Body XS Bold',
				className: 'body-xs-bold',
				description: '12px, Bold',
			},
			{
				name: 'Body XS Link',
				className: 'body-xs-link',
				description: '12px, Regular, with underline',
			},
			{
				name: 'Code SM Regular',
				className: 'code-sm-reg',
				description: '14px, Regular, -0.01em letter spacing, Fira Mono',
			},
			{
				name: 'Code SM Semi-bold',
				className: 'code-sm-semi-bold',
				description: '14px, Semi-bold, -0.01em letter spacing, Fira Mono',
			},
			{
				name: 'Code XS Regular',
				className: 'code-xs-reg',
				description: '12px, Regular, -0.01em letter spacing, Fira Mono',
			},
			{
				name: 'Code XS Semi-bold',
				className: 'code-xs-semi-bold',
				description: '12px, Semi-bold, -0.01em letter spacing, Fira Mono',
			},
		];

		return (
			<div className={styles.typographyContainer}>
				<DsTypography className={styles.pageTitle} variant="heading1">
					Typography Design System v1.2
				</DsTypography>
				<DsTypography className={styles.pageDescription} variant="body-md-reg">
					This showcase displays all typography classes defined in the Design System v1.2.
				</DsTypography>

				<div className={styles.typographyGrid}>
					{typographyClasses.map((typographyClass) => (
						<div key={typographyClass.className} className={styles.typographyItem}>
							<div className={styles.typographyInfo}>
								<DsTypography className={styles.typographyName} variant="body-md-bold">
									<h3>{typographyClass.name}</h3>
								</DsTypography>
								<DsTypography className={styles.typographyDescription} variant="body-md-reg">
									{typographyClass.description}
								</DsTypography>
								<DsTypography className={styles.typographyClass} variant="code-sm-reg">
									.{typographyClass.className}
								</DsTypography>
							</div>
							<div className={styles.typographyPreview}>
								<DsTypography variant={typographyClass.className}>
									<p>{sampleText}</p>
								</DsTypography>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	},
};

export const SemanticVariants: Story = {
	render: function Render() {
		// Construct sections from semanticElementMap
		const semanticSections = [
			{
				title: 'Headings',
				variants: Object.keys(semanticElementMap).filter((key) =>
					key.startsWith('heading'),
				) as SemanticVariant[],
			},
			{
				title: 'Body Text',
				variants: Object.keys(semanticElementMap).filter((key) =>
					key.startsWith('body'),
				) as SemanticVariant[],
			},
			{
				title: 'Code Text',
				variants: Object.keys(semanticElementMap).filter((key) =>
					key.startsWith('code'),
				) as SemanticVariant[],
			},
		];

		return (
			<div className={styles.typographyContainer}>
				<DsTypography className={styles.pageTitle} variant="heading1">
					Semantic Variants
				</DsTypography>
				<DsTypography className={styles.pageDescription} variant="body-md-reg">
					Predefined typography combinations that match your design system specifications.
				</DsTypography>

				{semanticSections.map((section) => (
					<section key={section.title} className={styles.comparisonSection}>
						<DsTypography className={styles.sectionTitle} variant="heading3" asChild>
							<h2>{section.title}</h2>
						</DsTypography>
						{section.variants.map((variant: SemanticVariant) => (
							<div key={variant} className={styles.comparisonItem}>
								<DsTypography className={styles.comparisonLabel} variant="code-sm-reg">
									{variant}
								</DsTypography>
								<DsTypography variant={variant}>
									{sampleText} ({semanticElementMap[variant] as string})
								</DsTypography>
							</div>
						))}
					</section>
				))}
			</div>
		);
	},
};
