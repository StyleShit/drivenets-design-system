import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import DsRadioGroup from './ds-radio-group';

const meta: Meta<typeof DsRadioGroup> = {
	title: 'Design System/RadioGroup',
	component: DsRadioGroup,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		options: {
			control: 'object',
			description: 'Array of radio options with label and value',
		},
		value: {
			control: 'text',
			description: 'Controlled selected value',
		},
		defaultValue: {
			control: 'text',
			description: 'Default selected value for uncontrolled usage',
		},
		onValueChange: {
			action: 'value changed',
			description: 'Callback when selected value changes',
			table: {
				category: 'Events',
			},
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes for the root element',
		},
	},
};

export default meta;
type Story = StoryObj<typeof DsRadioGroup>;

export const Default: Story = {
	args: {
		options: [
			{ label: 'Option 1', value: 'option1', labelInfo: 'Option 1 Info', disabled: true },
			{ label: 'Option 2', value: 'option2', labelInfo: 'Option 2 Info' },
			{ label: 'Option 3', value: 'option3' },
		],
		defaultValue: 'option1',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Locate the radio buttons by their role
		const option1 = await canvas.findByRole('radio', { name: /Option 1/i });
		const option2 = await canvas.findByRole('radio', { name: /Option 2/i });
		const option3 = await canvas.findByRole('radio', { name: /Option 3/i });

		// Assert that Option 1 is initially selected
		await expect(option1).toBeChecked();

		// Assert that label info is displayed for options that have it
		await expect(canvas.getByText('Option 1 Info')).toBeInTheDocument();
		await expect(canvas.getByText('Option 2 Info')).toBeInTheDocument();

		// Click on Option 2
		await userEvent.click(option2);

		// Assert that Option 1 is no longer selected
		await expect(option1).not.toBeChecked();

		// Assert that Option 2 is now selected
		await expect(option2).toBeChecked();

		// Attempt to click the disabled Option 1
		await userEvent.click(option1, { pointerEventsCheck: 0 });

		// Assert that Option 1 remains unchecked
		await expect(option1).not.toBeChecked();
	},
};
