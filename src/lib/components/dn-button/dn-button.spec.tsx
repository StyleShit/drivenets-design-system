import { render } from '@testing-library/react';

import DnButton from './dn-button';

describe('DnButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DnButton />);
    expect(baseElement).toBeTruthy();
  });
});
