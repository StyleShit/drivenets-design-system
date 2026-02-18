import type { CSSProperties, Ref } from 'react';
import type { DsAvatarSize } from '../ds-avatar';
import type { SemanticVariant } from '../ds-typography';

export const skeletonColorVariants = ['gray', 'blue'] as const;
export type SkeletonColorVariant = (typeof skeletonColorVariants)[number];

export const skeletonRadiusVariants = ['default', 'round'] as const;
export type SkeletonRadiusVariant = (typeof skeletonRadiusVariants)[number];

/**
 * Shared base props for all skeleton components
 */
export interface DsSkeletonBaseProps {
	/**
	 * Color variant of the skeleton
	 * @default 'gray'
	 */
	color?: SkeletonColorVariant;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional inline styles
	 */
	style?: CSSProperties;
	/**
	 * Ref to the skeleton element
	 */
	ref?: Ref<HTMLSpanElement>;
}

/**
 * Props for DsSkeleton.Text component
 * Typography-based text skeleton with configurable lines
 */
export interface DsSkeletonTextProps extends DsSkeletonBaseProps {
	/**
	 * Typography variant - determines the height of the skeleton
	 * @default 'body-sm-reg'
	 */
	typographyVariant?: SemanticVariant;
	/**
	 * Number of lines to render
	 * @default 1
	 */
	lines?: number;
	/**
	 * Width of skeleton. Last line will have varied width if not specified.
	 * Can be a number (px) or string ('50%', '200px')
	 * @default '100%' (last line varies between 40-80%)
	 */
	width?: string | number;
	/**
	 * Border radius: 'default' (4px), 'round' (pill-shaped), or custom px value
	 * @default 'default'
	 */
	radius?: SkeletonRadiusVariant | number;
}

/**
 * Props for DsSkeleton.Circle component
 * Circular skeleton for avatars and icons
 */
export interface DsSkeletonCircleProps extends DsSkeletonBaseProps {
	/**
	 * Size of the circle - matches DsAvatar sizes or custom pixel value
	 * @default 'regular'
	 */
	size?: DsAvatarSize | number;
}

/**
 * Props for DsSkeleton.Rect component
 * Rectangular skeleton for buttons, images, and custom shapes
 */
export interface DsSkeletonRectProps extends DsSkeletonBaseProps {
	/**
	 * Width of rectangle. Can be number (px) or string ('50%', '200px')
	 */
	width: string | number;
	/**
	 * Height of rectangle. Can be number (px) or string ('50%', '200px')
	 */
	height: string | number;
	/**
	 * Border radius: 'default' (4px), 'round' (pill-shaped), or custom px value
	 * @default 'default'
	 */
	radius?: SkeletonRadiusVariant | number;
}
