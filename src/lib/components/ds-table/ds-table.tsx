import * as React from 'react';
import {
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	RowSelectionState,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from '@tanstack/react-table';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import classnames from 'classnames';
import { Table, TableBody, TableCell, TableRow } from './components/core-table';
import { DsTableBulkActions } from './components/ds-table-bulk-actions';
import { DsTableHeader } from './components/ds-table-header';
import styles from './ds-table.module.scss';
import type { DataTableProps } from './ds-table.types';
import { DsTableRow } from './components/ds-table-row';
import { useDragAndDrop } from './hooks/use-drag-and-drop';

/**
 * Design system Table component
 */
const DsTable = <TData extends { id: string }, TValue>({
	columns,
	data: tableData = [],
	virtualized = false,
	virtualizedOptions = {
		estimateSize: 48,
		overscan: 10,
	},
	pagination = true,
	pageSize = 10,
	className,
	onRowClick,
	emptyState,
	stickyHeader = true,
	bordered = true,
	fullWidth = true,
	highlightOnHover = true,
	expandable = false,
	isRowExpandable,
	renderExpandedRow,
	filterElement,
	onTableCreated,
	selectable = false,
	showSelectAllCheckbox = true,
	onSelectionChange,
	actions = [],
	onRowDoubleClick,
	primaryRowActions = [],
	secondaryRowActions,
	reorderable = false,
	onOrderChange,
	columnFilters: externalColumnFilters,
	onColumnFiltersChange,
}: DataTableProps<TData, TValue>) => {
	const [data, setData] = React.useState(tableData);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
	const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});

	const { DragWrapper, SortableWrapper } = useDragAndDrop<TData>({
		isDragEnabled: reorderable && !virtualized,
		onOrderChange: (newData) => {
			setData(newData);
			onOrderChange?.(newData);
		},
		items: data,
	});

	const tableContainerRef = React.useRef<HTMLDivElement>(null);

	const columnFilters = externalColumnFilters ?? internalColumnFilters;
	const handleColumnFiltersChange = (
		updaterOrValue: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState),
	) => {
		const newFilters = typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters) : updaterOrValue;
		if (onColumnFiltersChange) {
			onColumnFiltersChange(newFilters);
		} else {
			setInternalColumnFilters(newFilters);
		}
	};

	const handleRowSelectionChange = (
		updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState),
	) => {
		const newRowSelection =
			typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
		setRowSelection(newRowSelection);
		onSelectionChange?.(newRowSelection);
	};

	const table = useReactTable({
		data: reorderable ? data : tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: handleColumnFiltersChange,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: handleRowSelectionChange,
		getRowId: (row) => row.id,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize,
			},
		},
		enableRowSelection: selectable,
	});
	onTableCreated?.(table);

	const { rows } = table.getRowModel();

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => virtualizedOptions.estimateSize || 48,
		overscan: virtualizedOptions.overscan || 10,
	});

	const toggleRowExpanded = (rowId: string) => {
		setExpandedRows((prev) => ({
			...prev,
			[rowId]: !prev[rowId],
		}));
	};

	const virtualItems = virtualized ? rowVirtualizer.getVirtualItems() : null;
	const totalSize = virtualized ? rowVirtualizer.getTotalSize() : null;

	const renderEmptyState = () => (
		<TableRow>
			<TableCell
				colSpan={columns.length + (expandable ? 1 : 0) + (selectable ? 1 : 0)}
				className={styles.emptyState}
			>
				{emptyState || 'No results.'}
			</TableCell>
		</TableRow>
	);

	const selectedRows = Object.entries(rowSelection)
		.filter(([, selected]) => selected)
		.map(([key]) => table.getRow(key).original);

	return (
		<div className={classnames(styles.container, className)}>
			{filterElement}
			<div
				ref={tableContainerRef}
				className={classnames(styles.dataTableContainer, virtualized && styles.virtualized)}
			>
				{virtualized && totalSize ? (
					<div
						className={styles.virtualRowContainer}
						style={{
							height: `${totalSize}px`,
						}}
					>
						<table className={classnames(styles.table, !bordered && styles.tableNoBorder)}>
							<DsTableHeader
								table={table}
								stickyHeader={stickyHeader}
								bordered={bordered}
								expandable={expandable}
								selectable={selectable}
								showSelectAllCheckbox={showSelectAllCheckbox}
							/>
							<TableBody>
								{virtualItems &&
									virtualItems.map((virtualRow: VirtualItem) => {
										const row = rows[virtualRow.index];
										return (
											<DsTableRow
												key={row.id}
												row={row}
												virtualRow={virtualRow}
												expandable={expandable}
												isRowExpandable={isRowExpandable}
												expandedRows={expandedRows}
												selectable={selectable}
												onRowClick={onRowClick}
												onRowDoubleClick={onRowDoubleClick}
												renderExpandedRow={renderExpandedRow}
												virtualized={virtualized}
												bordered={bordered}
												highlightOnHover={highlightOnHover}
												toggleRowExpanded={toggleRowExpanded}
												primaryRowActions={primaryRowActions}
												secondaryRowActions={secondaryRowActions}
											/>
										);
									})}
							</TableBody>
						</table>
					</div>
				) : (
					<DragWrapper>
						<Table className={classnames(fullWidth && styles.fullWidth, !bordered && styles.tableNoBorder)}>
							<DsTableHeader
								table={table}
								stickyHeader={stickyHeader}
								bordered={bordered}
								expandable={expandable}
								selectable={selectable}
								reorderable={reorderable}
								showSelectAllCheckbox={showSelectAllCheckbox}
							/>
							<TableBody>
								<SortableWrapper>
									{rows.length
										? rows.map((row) => (
												<DsTableRow
													key={row.id}
													row={row}
													expandable={expandable}
													isRowExpandable={isRowExpandable}
													expandedRows={expandedRows}
													selectable={selectable}
													reorderable={reorderable}
													onRowClick={onRowClick}
													onRowDoubleClick={onRowDoubleClick}
													renderExpandedRow={renderExpandedRow}
													virtualized={virtualized}
													bordered={bordered}
													highlightOnHover={highlightOnHover}
													toggleRowExpanded={toggleRowExpanded}
													primaryRowActions={primaryRowActions}
													secondaryRowActions={secondaryRowActions}
												/>
											))
										: renderEmptyState()}
								</SortableWrapper>
							</TableBody>
						</Table>
					</DragWrapper>
				)}
			</div>
			{selectable && actions.length > 0 && (
				<DsTableBulkActions
					numSelectedRows={selectedRows.length}
					actions={actions.map((action) => ({
						...action,
						onClick: () => action.onClick(selectedRows),
					}))}
					onClearSelection={table.resetRowSelection}
				/>
			)}
		</div>
	);
};

export default DsTable;
