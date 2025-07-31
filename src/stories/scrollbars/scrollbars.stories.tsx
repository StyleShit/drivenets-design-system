import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
	title: 'Design System/Scrollbars',
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
Global scrollbar styles that can be applied to any element with overflow content.

## Usage
- \`scrollbar-default\`: 12px scrollbar width/height
- \`scrollbar-small\`: 4px scrollbar width/height

Apply these classes to any element that has overflow content.
				`,
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to generate content
const generateContent = (count: number, direction: 'vertical' | 'horizontal') => {
	const items = Array.from({ length: count }, (_, i) => (
		<div
			key={i}
			style={{
				padding: '16px',
				margin: '8px',
				backgroundColor: '#f5f5f5',
				border: '1px solid #ddd',
				borderRadius: '4px',
				...(direction === 'horizontal' && {
					display: 'inline-block',
					width: '200px',
					marginRight: '16px',
				}),
			}}
		>
			<h3>Item {i + 1}</h3>
			<p>Content for item {i + 1}</p>
		</div>
	));

	return (
		<div
			style={{
				...(direction === 'horizontal' && {
					display: 'flex',
					whiteSpace: 'nowrap',
				}),
			}}
		>
			{items}
		</div>
	);
};

export const DefaultScrollbar: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '20px' }}>
			{/* Vertical scrollbar */}
			<div style={{ width: '300px' }}>
				<h3>Vertical Scrollbar (Default)</h3>
				<div
					className="scrollbar-default"
					style={{
						height: '300px',
						overflow: 'auto',
						border: '1px solid #ddd',
						borderRadius: '8px',
						padding: '16px',
					}}
				>
					{generateContent(20, 'vertical')}
				</div>
			</div>

			{/* Horizontal scrollbar */}
			<div style={{ width: '400px' }}>
				<h3>Horizontal Scrollbar (Default)</h3>
				<div
					className="scrollbar-default"
					style={{
						height: '300px',
						overflow: 'auto',
						border: '1px solid #ddd',
						borderRadius: '8px',
						padding: '16px',
					}}
				>
					{generateContent(15, 'horizontal')}
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Default 12px scrollbars for both vertical and horizontal overflow.',
			},
		},
	},
};

export const SmallScrollbar: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '20px' }}>
			{/* Vertical scrollbar */}
			<div style={{ width: '300px' }}>
				<h3>Vertical Scrollbar (Small)</h3>
				<div
					className="scrollbar-small"
					style={{
						height: '300px',
						overflow: 'auto',
						border: '1px solid #ddd',
						borderRadius: '8px',
						padding: '16px',
					}}
				>
					{generateContent(20, 'vertical')}
				</div>
			</div>

			{/* Horizontal scrollbar */}
			<div style={{ width: '400px' }}>
				<h3>Horizontal Scrollbar (Small)</h3>
				<div
					className="scrollbar-small"
					style={{
						height: '300px',
						overflow: 'auto',
						border: '1px solid #ddd',
						borderRadius: '8px',
						padding: '16px',
					}}
				>
					{generateContent(15, 'horizontal')}
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Small 4px scrollbars for both vertical and horizontal overflow.',
			},
		},
	},
};

export const CombinedExample: Story = {
	render: () => (
		<div style={{ width: '600px' }}>
			<h3>Combined Example - Both X and Y Overflow</h3>
			<div
				className="scrollbar-default"
				style={{
					height: '400px',
					overflow: 'auto',
					border: '1px solid #ddd',
					borderRadius: '8px',
					padding: '16px',
				}}
			>
				<div style={{ width: '800px' }}>
					<h2>Wide Content</h2>
					<p>This container has both vertical and horizontal overflow, showing both scrollbars.</p>
					{generateContent(25, 'horizontal')}
					{generateContent(25, 'horizontal')}
					{generateContent(25, 'horizontal')}
				</div>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Example showing both vertical and horizontal scrollbars on the same container.',
			},
		},
	},
};
