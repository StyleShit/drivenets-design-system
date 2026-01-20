export interface FitTagsResult {
	count: number;
	usedWidth: number;
}

export interface ElementMeasurements {
	tagWidths: number[];
	labelWidth: number;
	clearButtonWidth: number;
	expandTagWidth: number;
	gap: number;
}

/**
 * Calculate how many tags fit within the available width.
 * Pure function for easy testing.
 */
export function fitTagsInRow(tagWidths: number[], availableWidth: number, gap: number): FitTagsResult {
	let usedWidth = 0;
	let count = 0;

	for (const tagWidth of tagWidths) {
		const widthWithGap = tagWidth + (count > 0 ? gap : 0);
		if (usedWidth + widthWithGap <= availableWidth) {
			usedWidth += widthWithGap;
			count++;
		} else {
			break;
		}
	}

	return { count, usedWidth };
}

/**
 * Calculate the available width inside a container, accounting for padding.
 */
export function getContainerAvailableWidth(container: HTMLDivElement): number {
	const containerRect = container.getBoundingClientRect();
	const containerStyle = getComputedStyle(container);
	const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
	const paddingRight = parseFloat(containerStyle.paddingRight) || 0;
	return containerRect.width - paddingLeft - paddingRight;
}

/**
 * Measure all relevant elements (tags, label, buttons) inside the measurement container.
 */
export function getElementMeasurements(measurementContainer: HTMLDivElement): ElementMeasurements {
	const tags = Array.from(measurementContainer.querySelectorAll('[data-measure-tag]'));
	const label = measurementContainer.querySelector('[data-measure-label]');
	const clearButton = measurementContainer.querySelector('[data-measure-clear]');
	const expandTag = measurementContainer.querySelector('[data-measure-expand]');

	const computedStyle = getComputedStyle(measurementContainer);
	const gap = parseFloat(computedStyle.gap) || 8;

	const tagWidths = tags.map((tag) => tag.getBoundingClientRect().width);
	const labelWidth = label ? label.getBoundingClientRect().width + gap : 0;
	const clearButtonWidth = clearButton ? clearButton.getBoundingClientRect().width + gap : 0;
	// Fallback width for expand tag (~100px for "+99 filters" text) if measurement fails
	const expandTagWidth = expandTag ? expandTag.getBoundingClientRect().width + gap : 100;

	return { tagWidths, labelWidth, clearButtonWidth, expandTagWidth, gap };
}
