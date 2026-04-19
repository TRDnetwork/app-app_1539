import React from 'react';
import { projects } from '../data/projects';

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <article
    key={project.id}
    className="bg-surface p-6 rounded-lg shadow hover-lift slide-up"
    style={{ animationDelay: `${0.2 + project.id * 0.1}s` }}
    role="article"
  >
    {project.image && (
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-48 object-cover rounded mb-4"
      />
    )}
    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
    <p className="text-dim mb-4">{project.description}</p>
    <a
      href={project.link}
      className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent-alt focus:ring-offset-2 rounded"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View details for ${project.title}`}
    >
      View Project →
    </a>
  </article>
);

const ProjectSection = () => (
  <section id="projects" className="py-16" aria-labelledby="projects-heading">
    <div className="container">
      <h2 id="projects-heading" className="text-3xl md:text-4xl font-bold mb-8 slide-up">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
        {projects.map((project) => (
          <li key={project.id} role="listitem">
            <ProjectCard project={project} />
          </li>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectSection;