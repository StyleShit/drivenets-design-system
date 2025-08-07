import React from 'react';
import type { ColumnDef, ColumnFiltersState, Table } from '@tanstack/react-table';
import { IconType } from '../ds-icon';
import { RowAction, SecondaryRowAction } from './components/ds-table-cell';

/**
 * API for programmatically controlling a DsTable component.
 * This interface provides methods to interact with the table's selection, sorting, filtering, and pagination features.
 *
 * @template TData - The type of data items in the table
 *
 * @example
 * ```tsx
 * const tableRef = useRef<DsTableApi<Person>>(null);
 *
 * // Select a specific row
 * tableRef.current?.selectRow('row-1');
 *
 * // Select multiple rows
 * tableRef.current?.selectRows(['row-1', 'row-2', 'row-3']);
 *
 * // Get all selected rows
 * const selected = tableRef.current?.getSelectedRows();
 * ```
 */
export interface DsTableApi<TData> {
	/**
	 * Selects a single row by its ID.
	 *
	 * @param rowId - The unique identifier of the row to select
	 *
	 * @example
	 * ```tsx
	 * tableRef.current?.selectRow('user-123');
	 * ```
	 */
	selectRow: (rowId: string) => void;

	/**
	 * Deselects a single row by its ID.
	 *
	 * @param rowId - The unique identifier of the row to deselect
	 *
	 * @example
	 * ```tsx
	 * tableRef.current?.deselectRow('user-123');
	 * ```
	 */
	deselectRow: (rowId: string) => void;

	/**
	 * Selects all visible rows in the table.
	 * This includes rows that are currently filtered or paginated.
	 *
	 * @example
	 * ```tsx
	 * tableRef.current?.selectAllRows();
	 * ```
	 */
	selectAllRows: () => void;

	/**
	 * Deselects all rows in the table.
	 * Clears the current selection state.
	 *
	 * @example
	 * ```tsx
	 * tableRef.current?.deselectAllRows();
	 * ```
	 */
	deselectAllRows: () => void;

	/**
	 * Selects multiple rows by their IDs.
	 *
	 * @param rowIds - Array of unique identifiers for the rows to select
	 *
	 * @example
	 * ```tsx
	 * tableRef.current?.selectRows(['user-1', 'user-2', 'user-3']);
	 * ```
	 */
	selectRows: (rowIds: string[]) => void;

	/**
	 * Returns an array of all currently selected row data.
	 *
	 * @returns Array of selected row data objects
	 *
	 * @example
	 * ```tsx
	 * const selectedUsers = tableRef.current?.getSelectedRows();
	 * console.log('Selected users:', selectedUsers);
	 * ```
	 */
	getSelectedRows: () => TData[];
}

/**
 * Represents a bulk action that can be performed on multiple selected rows
 */
export interface Action<TData> {
	/**
	 * Icon to be displayed for the action
	 */
	icon: IconType;

	/**
	 * Label text for the action
	 */
	label: string;

	/**
	 * Function to be called when the action is clicked, receives the selected rows as parameter
	 */
	onClick: (rows: TData[]) => void;
}

export interface DsDataTableProps<TData, TValue> {
	/**
	 * Ref to the table API
	 */
	ref?: React.RefObject<DsTableApi<TData> | null>;

	/**
	 * Columns of the table
	 */
	columns: ColumnDef<TData, TValue>[];

	/**
	 * Data of the table
	 */
	data: TData[];

	/**
	 * Whether the table is virtualized
	 * @default false
	 */
	virtualized?: boolean;

	/**
	 * Options for the virtualized table
	 */
	virtualizedOptions?: {
		/**
		 * Estimate size of the table
		 */
		estimateSize?: number;

		/**
		 * Overscan of the table
		 */
		overscan?: number;
	};

	/**
	 * Whether the table has pagination
	 * @default false
	 */
	pagination?: boolean;

	/**
	 * Size of the table
	 * @default 10
	 */
	pageSize?: number;

	/**
	 * Class name of the table
	 */
	className?: string;

	/**
	 * Function to handle row click
	 */
	onRowClick?: (row: TData) => void;

	/**
	 * Function to handle row double click
	 */
	onRowDoubleClick?: (row: TData) => void;

	/**
	 * Empty state of the table
	 */
	emptyState?: React.ReactNode;

	/**
	 * Whether the table has sticky header
	 */
	stickyHeader?: boolean;

	/**
	 * Whether the table has zebra stripes
	 */
	zebra?: boolean;

	/**
	 * Whether the table has bordered cells
	 */
	bordered?: boolean;

	/**
	 * Whether the table is full width
	 */
	fullWidth?: boolean;

	/**
	 * Whether the table has highlight on hover
	 */
	highlightOnHover?: boolean;

	/**
	 * Whether the table is expandable or if an individual row should be expandable
	 */
	expandable?: boolean | ((row: TData) => boolean);

	/**
	 * Function to render the expanded row
	 */
	renderExpandedRow?: (row: TData) => React.ReactNode;

	/**
	 * Filter element of the table
	 */
	filterElement?: React.ReactNode;

	/**
	 * Function to handle table creation
	 */
	onTableCreated?: (table: Table<TData>) => void;

	/**
	 * Whether the table rows are selectable
	 * @default false
	 */
	selectable?: boolean;

	/**
	 * Whether to show the select/deselect all checkbox in the header
	 * @default true
	 */
	showSelectAllCheckbox?: boolean;

	/**
	 * Function to handle selection change
	 */
	onSelectionChange?: (selectedRows: Record<string, boolean>) => void;

	/**
	 * Actions to be shown in the bulk actions
	 */
	actions?: Action<TData>[];

	/**
	 * Primary actions to be shown on each row (on hover)
	 */
	primaryRowActions?: RowAction<TData>[];

	/**
	 * Secondary actions to be shown in a dropdown on each row (on hover)
	 */
	secondaryRowActions?: SecondaryRowAction<TData>[];

	/**
	 * Whether the table rows are reorderable via drag & drop
	 * @note This feature does not work when virtualization is enabled
	 */
	reorderable?: boolean;

	/**
	 * Callback when the order of rows changes via drag & drop
	 */
	onOrderChange?: (newData: TData[]) => void;

	/**
	 * External column filters state
	 */
	columnFilters?: ColumnFiltersState;

	/**
	 * Callback when column filters change
	 */
	onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
}
