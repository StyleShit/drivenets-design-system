import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

/**
 * Radio option configuration
 */
export interface DsRadioOption<ValueType = string> {
	/**
	 * Display label for the radio option
	 */
	label: string;
	/**
	 * Value associated with this radio option
	 */
	value: ValueType;
	/**
	 * Additional label info for the radio option
	 */
	labelInfo?: string;
	/**
	 * Whether this radio option is disabled
	 */
	disabled?: boolean;
}

export interface DsRadioGroupProps<TOption extends DsRadioOption = DsRadioOption>
	extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
	/**
	 * The radio group options
	 */
	options: TOption[];
	/**
	 * The selected value
	 */
	value?: TOption['value'];
	/**
	 * The default selected value
	 */
	defaultValue?: TOption['value'];
	/**
	 * Event handler called when the selected value changes
	 *
	 * @param value
	 */
	onValueChange?: (value: TOption['value']) => void;
	/**
	 * Additional CSS class names
	 */
	className?: string;
	/**
	 * Additional styles to apply to the component
	 */
	style?: React.CSSProperties;
}
