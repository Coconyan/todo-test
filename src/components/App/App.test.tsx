import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todos text', () => {
  render(<App />);
  expect(screen.getByText(/todos/i)).toBeInTheDocument();
});
