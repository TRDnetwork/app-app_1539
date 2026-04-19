export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Design System Toolkit',
    description: 'A comprehensive design system built with Figma and React components.',
    link: '#project-1',
    image: '/images/project-1.jpg',
  },
  {
    id: 2,
    title: 'E-Commerce Dashboard',
    description: 'An analytics dashboard for tracking sales, inventory, and customer behavior.',
    link: '#project-2',
    image: '/images/project-2.jpg',
  },
  {
    id: 3,
    title: 'Mobile Task Manager',
    description: 'A sleek, gesture-driven task management app for iOS and Android.',
    link: '#project-3',
    image: '/images/project-3.jpg',
  },
];