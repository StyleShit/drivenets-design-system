import type { Meta, StoryObj } from '@storybook/react';
import DsSystemStatus from './ds-system-status';
import { systemStatuses } from './ds-system-status.types';

const meta: Meta<typeof DsSystemStatus> = {
	title: 'Design System/System Status',
	component: DsSystemStatus,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: { type: 'select' },
			options: systemStatuses,
		},
		label: {
			control: 'text',
			description: 'Custom label text (optional)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsSystemStatus>;

export const Default: Story = {
	args: {
		status: 'healthy',
	},
};

export const CustomLabel: Story = {
	args: {
		status: 'error',
		label: 'Critical Error',
	},
};
