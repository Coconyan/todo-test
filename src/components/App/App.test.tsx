import {
  render,
  screen
} from '@testing-library/react';
import App from './App';

describe('Component: App', () => {
  it('should render correctly', () => {
    render(<App />);
    expect(screen.getByText(/todos/i)).toBeInTheDocument();
  });
});
