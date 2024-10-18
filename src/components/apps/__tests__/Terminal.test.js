import React from 'react';
import { render } from '@testing-library/react';
import Terminal from '../Terminal';

test('renders Terminal component without crashing', () => {
  const { getByText } = render(<Terminal />);
  expect(getByText(/Welcome to the terminal/i)).toBeInTheDocument();
});
