import { ReactElement } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

const ProjectCard = ({ title, description, link }: ProjectCardProps): ReactElement => {
  return (
    <article className="bg-surface p-6 rounded-lg shadow-sm hover-lift transition-all duration-300 flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-[#1a2e1a]">{title}</h3>
      <p className="text-dim mb-4 flex-grow">{description}</p>
      <a
        href={link}
        className="text-[#e66000] font-medium inline-flex items-center mt-auto"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </article>
  );
};

export default ProjectCard;