import { render } from '@testing-library/react';

import DsButton from './ds-button-new';

describe('DsButton', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<DsButton />);
		expect(baseElement).toBeTruthy();
	});
});
