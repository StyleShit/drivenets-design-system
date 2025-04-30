import type { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import DsIcon from '../ds-icon/ds-icon'; // Assuming DsIcon exists
import DsTable from './ds-table'; // Assuming DsTable is exported from ds-table.tsx

// --- Mock Data and Types ---
type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: 'relationship' | 'complicated' | 'single';
  progress: number;
};

const defaultData: Person[] = [
  {
    id: 1,
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 33,
    visits: 100,
    status: 'single',
    progress: 75,
  },
  {
    id: 2,
    firstName: 'Kevin',
    lastName: 'Vonderheide',
    age: 28,
    visits: 200,
    status: 'relationship',
    progress: 50,
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Doe',
    age: 45,
    visits: 50,
    status: 'complicated',
    progress: 90,
  },
  { id: 4, firstName: 'Jane', lastName: 'Smith', age: 30, visits: 150, status: 'single', progress: 60 },
  {
    id: 5,
    firstName: 'Peter',
    lastName: 'Jones',
    age: 22,
    visits: 250,
    status: 'relationship',
    progress: 30,
  },
  {
    id: 6,
    firstName: 'Mary',
    lastName: 'Jane',
    age: 38,
    visits: 80,
    status: 'complicated',
    progress: 85,
  },
  {
    id: 7,
    firstName: 'David',
    lastName: 'Williams',
    age: 50,
    visits: 120,
    status: 'single',
    progress: 40,
  },
  {
    id: 8,
    firstName: 'Sarah',
    lastName: 'Brown',
    age: 25,
    visits: 180,
    status: 'relationship',
    progress: 70,
  },
  {
    id: 9,
    firstName: 'Michael',
    lastName: 'Davis',
    age: 41,
    visits: 95,
    status: 'complicated',
    progress: 20,
  },
  {
    id: 10,
    firstName: 'Emily',
    lastName: 'Miller',
    age: 36,
    visits: 110,
    status: 'single',
    progress: 55,
  },
  {
    id: 11,
    firstName: 'Daniel',
    lastName: 'Wilson',
    age: 29,
    visits: 220,
    status: 'relationship',
    progress: 80,
  },
  {
    id: 12,
    firstName: 'Olivia',
    lastName: 'Moore',
    age: 48,
    visits: 65,
    status: 'complicated',
    progress: 15,
  },
  {
    id: 13,
    firstName: 'James',
    lastName: 'Taylor',
    age: 31,
    visits: 135,
    status: 'single',
    progress: 95,
  },
  {
    id: 14,
    firstName: 'Sophia',
    lastName: 'Anderson',
    age: 27,
    visits: 170,
    status: 'relationship',
    progress: 25,
  },
  {
    id: 15,
    firstName: 'Robert',
    lastName: 'Thomas',
    age: 43,
    visits: 88,
    status: 'complicated',
    progress: 50,
  },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'visits',
    header: 'Visits',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    cell: info => `${info.getValue()}%`,
  },
];

// --- Storybook Meta ---
const meta: Meta<typeof DsTable<Person, unknown>> = {
  title: 'Design System/Table',
  component: DsTable,
  parameters: {
    layout: 'fullscreen', // Use fullscreen for tables usually
  },
  tags: ['autodocs'],
  argTypes: {
    // Define argTypes based on DsTable props if needed for controls
    // Example:
    // pagination: { control: 'boolean' },
    // zebra: { control: 'boolean' },
    // bordered: { control: 'boolean' },
    // highlightOnHover: { control: 'boolean' },
  },
  args: {
    // Default args for all stories
    columns: columns,
    data: defaultData,
    pagination: true,
    pageSize: 5,
    stickyHeader: true,
    bordered: true,
    fullWidth: true,
    highlightOnHover: true,
    expandable: false,
    virtualized: false, // Keep virtualized off by default for simpler stories
    emptyState: <div>No data available</div>,
    onRowClick: row => console.log('Row clicked:', row),
  },
  decorators: [
    Story => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DsTable<Person, unknown>>;

// --- Stories ---

export const Default: Story = {
  args: {
    // Override default args here if needed
    pagination: false, // Disable pagination for default view
  },
};

export const Paginated: Story = {
  args: {
    pagination: true,
    pageSize: 5,
    data: defaultData, // Ensure enough data for pagination
  },
};

export const Sortable: Story = {
  args: {
    // Sorting is enabled by default based on component code (getSortedRowModel)
    // No specific args needed unless you want to set initial sort state
  },
};

export const Expandable: Story = {
  args: {
    expandable: true,
    renderExpandedRow: row => (
      <div style={{ padding: '10px', backgroundColor: '#f9f9f9', borderLeft: '3px solid lightblue' }}>
        <h4>Expanded Details for {row.firstName}</h4>
        <p>ID: {row.id}</p>
        <p>
          Full Name: {row.firstName} {row.lastName}
        </p>
        <p>Status: {row.status}</p>
      </div>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    data: [], // Provide empty data array
    emptyState: (
      <div style={{ padding: '20px', textAlign: 'center', border: '1px dashed #ccc' }}>
        <DsIcon name="info" size="large" /> {/* Assuming DsIcon exists */}
        <p style={{ marginTop: '10px' }}>No matching records found.</p>
      </div>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    bordered: false,
  },
};

export const Selectable: Story = {
  args: {
    selectable: true,
    onSelectionChange: selectedRows => console.log('Selected rows:', selectedRows),
  },
};

// Add more stories for other features like:
// - Virtualized
// - Custom Cell Rendering
// - Filtering (requires adding filterElement)
// - Row Selection (requires adding selection column/logic)
