import { ReactElement } from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection = (): ReactElement => {
  const projects = [
    {
      title: 'Design Portfolio',
      description:
        'A curated collection of UI/UX case studies showcasing clean, user-centered design solutions.',
      link: 'https://example.com/design',
    },
    {
      title: 'E-Commerce Dashboard',
      description:
        'An analytics dashboard for online stores, featuring real-time sales data and customer insights.',
      link: 'https://example.com/dashboard',
    },
    {
      title: 'Mobile Meditation App',
      description:
        'A calming mobile experience with guided sessions, breath timers, and progress tracking.',
      link: 'https://example.com/meditate',
    },
  ];

  return (
    <section id="projects" className="py-16 slide-up">
      <div className="container">
        <h2 className="text-3xl md:text-4xl text-center mb-4">Featured Projects</h2>
        <p className="text-dim text-center max-w-2xl mx-auto mb-12">
          A glimpse into recent work — each crafted with intention and attention to detail.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;