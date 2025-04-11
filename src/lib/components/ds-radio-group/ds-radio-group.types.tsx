import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export interface DsRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /**
   * The radio group options
   */
  options: { label: string; value: string; disabled?: boolean }[];
  /**
   * The selected value
   */
  value?: string;
  /**
   * The default selected value
   */
  defaultValue?: string;
  /**
   * Event handler called when the selected value changes
   *
   * @param value
   */
  onValueChange?: (value: string) => void;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Additional styles to apply to the component
   */
  style?: React.CSSProperties;
}
