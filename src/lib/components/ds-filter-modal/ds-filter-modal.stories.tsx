import type { Meta, StoryObj } from '@storybook/react';
import { DsFilterModal } from './ds-filter-modal';
import { useState } from 'react';
import { FilterNavItem } from './ds-filter-modal.types';

const meta: Meta<typeof DsFilterModal> = {
	component: DsFilterModal,
	title: 'Design System/Filter Modal',
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DsFilterModal>;

const sampleFilterItems: FilterNavItem[] = [
	{ id: 'status', label: 'Status', count: 2 },
	{ id: 'running', label: 'Running/Completed' },
	{ id: 'category', label: 'Category', count: 1 },
	{ id: 'version', label: 'Version' },
	{ id: 'lastEdited', label: 'Last edited' },
	{ id: 'lastRun', label: 'Last run' },
	{ id: 'nextRun', label: 'Next run' },
	{ id: 'nextRunDisabled', label: 'Next run (disabled)', disabled: true },
];

const DefaultStory = () => {
	const [open, setOpen] = useState(true);
	const [selectedFilter, setSelectedFilter] = useState('status');

	return (
		<>
			<button onClick={() => setOpen(true)}>Open Filter Modal</button>
			<DsFilterModal
				open={open}
				onOpenChange={setOpen}
				filterNavItems={sampleFilterItems}
				selectedFilterId={selectedFilter}
				onFilterSelect={setSelectedFilter}
				onClearAll={() => console.log('Clear all filters')}
				onApply={() => {
					console.log('Apply filters');
					setOpen(false);
				}}
			>
				<div style={{ padding: '20px' }}>
					<h3>Filter Content for: {selectedFilter}</h3>
					<p>Add your filter controls here based on the selected category.</p>
				</div>
			</DsFilterModal>
		</>
	);
};

export const Default: Story = {
	render: () => <DefaultStory />,
};

const WithCustomLabelsStory = () => {
	const [open, setOpen] = useState(true);
	const [selectedFilter, setSelectedFilter] = useState('status');

	return (
		<>
			<button onClick={() => setOpen(true)}>Open Filter Modal</button>
			<DsFilterModal
				open={open}
				onOpenChange={setOpen}
				filterNavItems={sampleFilterItems}
				selectedFilterId={selectedFilter}
				onFilterSelect={setSelectedFilter}
				onClearAll={() => console.log('Clear all filters')}
				onApply={() => setOpen(false)}
				applyLabel="Apply Filters"
				clearAllLabel="Reset All"
			>
				<div style={{ padding: '20px' }}>
					<h3>Custom Labels Example</h3>
					<p>This modal uses custom button labels.</p>
				</div>
			</DsFilterModal>
		</>
	);
};

export const WithCustomLabels: Story = {
	render: () => <WithCustomLabelsStory />,
};

const WithDisabledButtonsStory = () => {
	const [open, setOpen] = useState(true);
	const [selectedFilter, setSelectedFilter] = useState('status');

	return (
		<>
			<button onClick={() => setOpen(true)}>Open Filter Modal</button>
			<DsFilterModal
				open={open}
				onOpenChange={setOpen}
				filterNavItems={sampleFilterItems}
				selectedFilterId={selectedFilter}
				onFilterSelect={setSelectedFilter}
				onClearAll={() => console.log('Clear all filters')}
				onApply={() => setOpen(false)}
				applyDisabled={true}
				clearAllDisabled={true}
			>
				<div style={{ padding: '20px' }}>
					<h3>Disabled Buttons Example</h3>
					<p>Both action buttons are disabled in this example.</p>
				</div>
			</DsFilterModal>
		</>
	);
};

export const WithDisabledButtons: Story = {
	render: () => <WithDisabledButtonsStory />,
};
