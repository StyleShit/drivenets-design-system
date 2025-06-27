import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export interface DsCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
	/**
	 * Label for the checkbox
	 */
	label?: string;
	/**
	 * Additional label info for the checkbox
	 */
	labelInfo?: string;
	/**
	 * The controlled checked state of the checkbox
	 */
	checked?: boolean | 'indeterminate';
	/**
	 * The default checked state of the checkbox
	 */
	defaultChecked?: boolean | 'indeterminate';
	/**
	 * Event handler called when the checked state of the checkbox changes.
	 *
	 * @param checked
	 */
	onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}
