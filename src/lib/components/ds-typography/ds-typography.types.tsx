import React from 'react';

export const semanticVariants = [
	// Body variants
	'body-md-reg',
	'body-md-md',
	'body-md-semi-bold',
	'body-md-bold',
	'body-md-link',

	'body-sm-reg',
	'body-sm-md',
	'body-sm-semi-bold',
	'body-sm-bold',
	'body-sm-link',

	'body-xs-reg',
	'body-xs-md',
	'body-xs-semi-bold',
	'body-xs-bold',
	'body-xs-link',

	// Code variants
	'code-sm-reg',
	'code-sm-semi-bold',
	'code-xs-reg',
	'code-xs-semi-bold',

	// Heading variants
	'heading1',
	'heading2',
	'heading3',
	'heading4',
] as const;
export type SemanticVariant = (typeof semanticVariants)[number];

export interface DsTypographyProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * The semantic variant of the component
	 */
	variant: SemanticVariant;
	/**
	 * When true, renders as Slot component for composition without extra DOM nodes
	 */
	asChild?: boolean;
	/**
	 * The content of the component
	 */
	children: React.ReactNode;
}
