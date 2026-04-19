import { render, screen, fireEvent } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  const mockOnClose = jest.fn();

  const setup = (show = true) => render(<Toast show={show} onClose={mockOnClose} message="Test message" />);

  test('does not render when show is false', () => {
    setup(false);
    expect(screen.queryByText(/test message/i)).not.toBeInTheDocument();
  });

  test('renders toast with correct message when show is true', () => {
    setup(true);
    expect(screen.getByText(/test message/i)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    setup(true);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('has proper ARIA attributes for accessibility', () => {
    setup(true);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveClass('toast');
  });

  test('applies slide-up animation when visible', () => {
    setup(true);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('slide-up');
  });
});