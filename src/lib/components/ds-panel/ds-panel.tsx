import { createContext, PropsWithChildren, useContext } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import classNames from 'classnames';
import styles from './ds-panel.module.scss';
import { DsIcon } from '../ds-icon';

type Variant = 'collapsed' | 'minimized';

export type DsPanelProps = Collapsible.CollapsibleProps & {
	variant?: Variant;
};

type Context = {
	variant: Variant;
	open?: boolean;
};

const PanelContext = createContext<Context | null>(null);

export function DsPanel({
	open,
	onOpenChange,
	children,
	className,
	variant = 'collapsed',
	...props
}: DsPanelProps) {
	return (
		<Collapsible.Root
			open={open}
			onOpenChange={onOpenChange}
			className={classNames(styles.root, className, {
				[styles.variantCollapsed]: variant === 'collapsed',
				[styles.variantMinimized]: variant === 'minimized',
			})}
			{...props}
		>
			<DsPanelTrigger />
			<PanelContext.Provider value={{ variant, open }}>{children}</PanelContext.Provider>
		</Collapsible.Root>
	);
}

function DsPanelTrigger() {
	return (
		<Collapsible.Trigger className={styles.trigger} aria-label="Toggle panel">
			<DsIcon icon="arrow_circle_left" variant="outlined" />
		</Collapsible.Trigger>
	);
}

export function DsPanelContent({ children }: PropsWithChildren) {
	const context = usePanel();

	if (context.variant === 'minimized' && !context.open) {
		return null;
	}

	return <Collapsible.Content>{children}</Collapsible.Content>;
}

export function DsPanelMinimizedContent({ children }: PropsWithChildren) {
	const context = usePanel();

	if (context.variant !== 'minimized' || context.open) {
		return null;
	}

	return <Collapsible.Content forceMount>{children}</Collapsible.Content>;
}

function usePanel() {
	const context = useContext(PanelContext);

	if (!context) {
		throw new Error('usePanel must be used within a DsPanel');
	}

	return context;
}
