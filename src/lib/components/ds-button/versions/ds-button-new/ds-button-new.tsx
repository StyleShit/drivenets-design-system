import classNames from 'classnames';
import React, { Children, isValidElement } from 'react';
import styles from './ds-button-new.module.scss';
import { DsButtonProps } from './ds-button-new.types';
import DsIcon from '../../../ds-icon/ds-icon';

const isIconOnly = (children: React.ReactNode) => {
	// Only one child
	if (Children.count(children) !== 1) return false;
	const onlyChild = Children.only(children);
	return isValidElement(onlyChild) && onlyChild.type === DsIcon;
};

/**
 * Design system Button component
 */
const DsButton: React.FC<DsButtonProps> = ({
	buttonType = 'primary',
	variant = 'filled',
	size = 'medium',
	disabled = false,
	className,
	contentClassName,
	children,
	...props
}) => {
	const buttonClass = classNames(
		styles.button,
		{ [styles.iconButton]: isIconOnly(children) },
		styles[`${buttonType}-${variant}`],
		styles[size],
		{ [styles.disabled]: disabled },
		className,
	);

	return (
		<button className={buttonClass} disabled={disabled} {...props}>
			<span className={classNames(styles.content, contentClassName)}>{children}</span>
		</button>
	);
};

export default DsButton;
