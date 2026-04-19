import '@testing-library/jest-dom';

// Mock IntersectionObserver for scroll animations
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback: any) => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}));

window.IntersectionObserver = mockIntersectionObserver;