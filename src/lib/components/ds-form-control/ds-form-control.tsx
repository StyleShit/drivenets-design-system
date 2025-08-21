import { ComponentType, createContext, FC, useContext, useId } from 'react';
import classNames from 'classnames';
import { DsIcon, IconType } from '../ds-icon';
import { DsSelect } from '../ds-select';
import { DsTextInput } from '../ds-text-input';
import { DsTextarea } from '../ds-textarea';
import { DsNumberInput } from '../ds-number-input';
import { DsPasswordInput } from '../ds-password-input';
import { DsFormControlCompound, DsFormControlDescriptionProps } from './ds-form-control.types';
import styles from './ds-form-control.module.scss';

const FormControlContext = createContext<{ controlId: string } | null>(null);

export const useFormControlContext = () => {
	const context = useContext(FormControlContext);
	if (!context) {
		throw new Error('useFormControlContext must be used within DsFormControl');
	}
	return context;
};

/**
 * HOC that automatically injects the controlId from form control context
 * into any component that expects an 'id' prop.
 *
 * @param Component - The component to wrap with form control context
 * @returns A new component that automatically receives the controlId
 */
export const controlify = <TProps extends { id?: string }>(Component: ComponentType<TProps>) => {
	return function WrappedFormControl(props: TProps) {
		const { controlId } = useFormControlContext();
		return <Component id={controlId} {...props} />;
	};
};

const DsFormControlDescription: FC<DsFormControlDescriptionProps> = ({ children, className }) => {
	return <div className={classNames(styles.description, className)}>{children}</div>;
};

const DsFormControl: DsFormControlCompound = ({
	id,
	schema,
	label,
	required = false,
	showHelpIcon = false,
	onHelpClick,
	message,
	messageIcon = 'info',
	className,
	style,
	children,
}) => {
	const generatedId = useId();
	const controlId = id || generatedId;

	return (
		<FormControlContext.Provider value={{ controlId }}>
			<div
				className={classNames(styles.container, schema && message && styles[schema], className)}
				style={style}
			>
				<div className={styles.labelContainer}>
					<label
						htmlFor={controlId}
						className={classNames(styles.label, {
							[styles.required]: required,
						})}
					>
						{label}
					</label>
					{showHelpIcon && (
						<button type="button" className={styles.helpIcon} onClick={onHelpClick} aria-label="Help">
							<DsIcon icon="info" size="small" />
						</button>
					)}
				</div>

				{children}

				{message && (
					<div className={styles.message}>
						<DsIcon icon={messageIcon as IconType} size="tiny" filled />
						<span className={styles.messageText}>{message}</span>
					</div>
				)}
			</div>
		</FormControlContext.Provider>
	);
};

DsFormControl.TextInput = controlify(DsTextInput);
DsFormControl.NumberInput = controlify(DsNumberInput);
DsFormControl.PasswordInput = controlify(DsPasswordInput);
DsFormControl.Textarea = controlify(DsTextarea);
DsFormControl.Select = controlify(DsSelect);
DsFormControl.Description = DsFormControlDescription;

export default DsFormControl;
