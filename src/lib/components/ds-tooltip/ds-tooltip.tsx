import { FC, isValidElement } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import styles from './ds-tooltip.module.scss';
import { DsTooltipProps } from './ds-tooltip.types';
<<<<<<< HEAD
import classNames from 'classnames';
=======
import { DsTypography } from '../ds-typography';
>>>>>>> origin/v25.3.1

const DsTooltip: FC<DsTooltipProps> = ({ content, children }) => {
	if (content === undefined) {
		return <>{children}</>;
	}
	return (
		<Tooltip.Provider delayDuration={200}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
<<<<<<< HEAD
					<Tooltip.Content
						className={classNames(styles.tooltip, { [styles.noClamp]: React.isValidElement(content) })}
						side="top"
						align="center"
						sideOffset={4}
					>
						{content}
=======
					<Tooltip.Content className={classNames(styles.tooltip)} side="top" align="center" sideOffset={4}>
						{isValidElement(content) ? (
							content
						) : (
							<DsTypography variant="body-xs-reg" className={styles.content}>
								{content}
							</DsTypography>
						)}
>>>>>>> origin/v25.3.1
						<Tooltip.Arrow className={styles.arrow} />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default DsTooltip;
