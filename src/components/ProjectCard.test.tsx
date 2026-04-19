import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    title: 'E-Commerce Dashboard',
    description: 'A full-stack admin panel with analytics and order management.',
    link: 'https://ecom-dash.example.com',
  };

  const setup = (props = mockProject) => render(<ProjectCard {...props} />);

  test('renders project title, description, and link', () => {
    setup();
    expect(screen.getByText(/e-commerce dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/full-stack admin panel/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view project/i })).toHaveAttribute('href', mockProject.link);
  });

  test('applies hover-lift class for animation effect', () => {
    setup();
    const card = screen.getByRole('link', { name: /view project/i }).closest('div');
    expect(card).toHaveClass('hover-lift');
  });

  test('opens project link in new tab', () => {
    setup();
    const link = screen.getByRole('link', { name: /view project/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders correctly with minimal description', () => {
    setup({ ...mockProject, description: 'Simple project.' });
    expect(screen.getByText(/simple project/i)).toBeInTheDocument();
  });

  test('renders correctly when link is missing', () => {
    setup({ ...mockProject, link: '' });
    const viewLink = screen.getByRole('link', { name: /view project/i });
    expect(viewLink).toHaveAttribute('href', '#');
    expect(viewLink).toHaveClass('cursor-not-allowed');
  });
});