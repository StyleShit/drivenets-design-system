import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import styles from './ds-radio-group.module.scss';
import { DsRadioGroupProps } from './ds-radio-group.types';

/**
 * Design system RadioGroup component
 */
const DsRadioGroup: React.FC<DsRadioGroupProps> = ({
	options,
	value,
	defaultValue,
	onValueChange,
	className,
	...props
}) => (
	<RadioGroupPrimitive.Root
		className={classNames(styles.radioGroupRoot, className)}
		value={value}
		defaultValue={defaultValue}
		onValueChange={onValueChange}
		{...props}
	>
		{options.map((option) => (
			<div key={option.value} className={styles.radioItemContainer}>
				<RadioGroupPrimitive.Item
					className={styles.radioItem}
					value={option.value}
					disabled={option.disabled}
					id={option.value}
				>
					<div className={styles.radioItemWrapper}>
						<RadioGroupPrimitive.Indicator className={styles.radioIndicator} />
					</div>
				</RadioGroupPrimitive.Item>
				<label className={styles.radioLabel} htmlFor={option.value}>
					{option.label}
					{option.labelInfo && <div className={styles.labelInfo}>{option.labelInfo}</div>}
				</label>
			</div>
		))}
	</RadioGroupPrimitive.Root>
);

export default DsRadioGroup;
