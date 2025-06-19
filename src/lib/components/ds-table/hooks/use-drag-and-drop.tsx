import React from 'react';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface UseDragAndDropResult<T> {
	data: T[];
	DragWrapper: React.FC<{ children: React.ReactNode }>;
	SortableWrapper: React.FC<{ children: React.ReactNode }>;
}

export function useDragAndDrop<T extends { id: string }>(
	isDragEnabled: boolean,
	onOrderChange: ((newData: T[]) => void) | undefined,
	initialData: T[],
): UseDragAndDropResult<T> {
	const [tableData, setTableData] = React.useState(initialData);
	const dataIds = React.useMemo<UniqueIdentifier[]>(
		() => tableData?.map((row) => row.id),
		[tableData],
	);

	React.useEffect(() => {
		setTableData(initialData);
	}, [initialData]);

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(KeyboardSensor, {}),
	);

	const handleDragEnd = React.useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;
			if (active.id !== over?.id) {
				const oldIndex = tableData.findIndex((row) => row.id === active.id);
				const newIndex = tableData.findIndex((row) => row.id === over?.id);
				if (oldIndex !== -1 && newIndex !== -1) {
					const newData = arrayMove(tableData, oldIndex, newIndex);
					setTableData(newData);
					if (onOrderChange) onOrderChange(newData);
				}
			}
		},
		[tableData, onOrderChange],
	);

	return React.useMemo(() => {
		if (!isDragEnabled) {
			return {
				data: tableData,
				DragWrapper: ({ children }) => children,
				SortableWrapper: ({ children }) => children,
			};
		}

		return {
			data: tableData,
			DragWrapper: ({ children }) => (
				<DndContext
					collisionDetection={closestCenter}
					modifiers={[restrictToVerticalAxis]}
					onDragEnd={handleDragEnd}
					sensors={sensors}
				>
					{children}
				</DndContext>
			),
			SortableWrapper: ({ children }) => (
				<SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
					{children}
				</SortableContext>
			),
		};
	}, [isDragEnabled, handleDragEnd, sensors, dataIds, tableData]);
}
