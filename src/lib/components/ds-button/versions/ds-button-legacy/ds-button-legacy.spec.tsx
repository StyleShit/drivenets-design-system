import { render } from '@testing-library/react';

import DsButtonLegacy from './ds-button-legacy';

describe('DsButton', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DsButtonLegacy />);
		expect(baseElement).toBeTruthy();
	});
});
