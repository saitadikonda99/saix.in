import Link from "next/link";
import SectionTag from "@/components/ui/section-tag";
import { projectsData } from "@/data/projects";

const Projects = () => (
  <div>
    <SectionTag>things i&apos;ve built</SectionTag>
    <ul className="flex flex-col gap-2">
      {projectsData.map((project) => (
        <li key={project.id} className="flex items-start gap-2">
          <span className="text-text-secondary select-none mt-0.5">•</span>
          <span>
            <Link
              href={project.liveUrl ?? project.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hl-link text-text-primary"
            >
              {project.title}
            </Link>
            {" "}
            <span className="text-text-secondary">{project.description}</span>
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default Projects;
