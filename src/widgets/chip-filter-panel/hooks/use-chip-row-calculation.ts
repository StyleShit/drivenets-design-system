import { RefObject, useLayoutEffect, useState } from 'react';

interface UseChipRowCalculationProps {
	chipsWrapperRef: RefObject<HTMLDivElement | null>;
	totalFilters: number;
}

/**
 * Custom hook to calculate how many chips can fit in 2 rows
 * Uses a simple approach: render all, measure positions, hide overflow
 */
export const useChipRowCalculation = ({ chipsWrapperRef, totalFilters }: UseChipRowCalculationProps) => {
	const [visibleCount, setVisibleCount] = useState(totalFilters);

	const calculateVisibleChips = () => {
		if (!chipsWrapperRef.current) return;

		const wrapper = chipsWrapperRef.current;
		const children = Array.from(wrapper.children) as HTMLElement[];

		if (children.length === 0) return;

		// setVisibleCount(10);
		// setVisibleCount(12);

		let index = 0;
		let line = 0;
		let total = 0;

		while (line < 2) {
			total = 0;
			if (index >= children.length) break;
			let current = children[index];
			while (total < wrapper.clientWidth) {
				const offset = current.offsetWidth === wrapper.clientWidth ? 0 : 8;
				const next = offset + current.offsetWidth;
				if (total + next >= wrapper.clientWidth) {
					line++;
					break;
				}
				total += next;
				index++;
				if (index >= children.length) break;
				current = children[index];
			}
		}

		// const result = Math.max(1, index - 1);
		const result = Math.max(1, line < 2 ? index : index - 1);
		console.log('calculateVisibleChips', result, line);
		setVisibleCount(result);
	};

	useLayoutEffect(() => {
		// Use requestAnimationFrame to ensure DOM is fully laid out
		const rafId = requestAnimationFrame(() => {
			calculateVisibleChips();
		});

		const resizeObserver = new ResizeObserver(() => {
			requestAnimationFrame(() => {
				calculateVisibleChips();
			});
		});

		if (chipsWrapperRef.current) {
			resizeObserver.observe(chipsWrapperRef.current);
		}

		return () => {
			cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
		};
	}, [chipsWrapperRef]);

	useLayoutEffect(() => {
		calculateVisibleChips();
	}, [chipsWrapperRef, totalFilters]);

	return visibleCount;
};
