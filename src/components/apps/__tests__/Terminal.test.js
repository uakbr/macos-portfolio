import React from 'react';
import { render } from '@testing-library/react';
import Terminal from '../Terminal';

test('renders Terminal component without crashing', () => {
  const { getByText } = render(<Terminal />);
  expect(getByText(/Hey, you found the terminal!/i)).toBeInTheDocument();
});
