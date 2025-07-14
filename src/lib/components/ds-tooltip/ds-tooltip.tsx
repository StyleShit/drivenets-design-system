import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './ds-tooltip.module.scss';
import { DsTooltipProps } from './ds-tooltip.types';

const DsTooltip: React.FC<DsTooltipProps> = ({ content, children }) => {
	return (
		<Tooltip.Provider delayDuration={200}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className={styles.tooltip} side="top" align="center" sideOffset={4}>
						{content}
						<Tooltip.Arrow className={styles.arrow} />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default DsTooltip;
