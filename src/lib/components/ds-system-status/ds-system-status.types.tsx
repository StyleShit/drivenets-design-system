import { IconType } from '../ds-icon/ds-icon.types';

export const systemStatuses = [
	'healthy',
	'neutral',
	'error',
	'in-progress',
	'pending',
	'alert',
	'disabled',
] as const;

export type SystemStatus = (typeof systemStatuses)[number];

export interface DsSystemStatusProps {
	/**
	 * The status of the system
	 */
	status: SystemStatus;
	/**
	 * The label to be displayed
	 */
	label?: string;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * The icon to be displayed
	 */
	icon?: IconType;
}
