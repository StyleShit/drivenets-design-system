import React from 'react';
import classNames from 'classnames';
import styles from './dn-button.module.scss';
import { DnButtonProps } from './dn-button.types';

const DnButton: React.FC<DnButtonProps> = ({
  schema = 'primary',
  variant = 'filled',
  size = 'medium',
  disabled = false,
  className,
  children,
  ...props
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[`${schema}-${variant}`],
    styles[size],
    { [styles.disabled]: disabled },
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default DnButton;
