import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Enterprise Event Management Platform",
    description: "Enterprise system for KL University's Student Activity Center to manage clubs and activities.",
    techStack: ["Next.js", "Node.js", "TypeScript", "MySQL", "Docker", "Redis"],
    liveUrl: "https://sac.kluniversity.in/",
    githubUrl: "https://github.com/saitadikonda99/Kepler-452b",
  },
  {
    id: 2,
    title: "Application Tracker",
    description: "Track and manage job applications efficiently.",
    techStack: ["Next.js", "Supabase", "Prisma"],
    liveUrl: "https://jobtracker13.vercel.app",
    githubUrl: "https://github.com/saitadikonda99/ApplicationTracker",
  },
  {
    id: 3,
    title: "Cache Db Lyte",
    description: "Lightweight in-memory caching database.",
    techStack: ["Node.js"],
    githubUrl: "https://github.com/saitadikonda99/Own-Cache-Database",
  },
  {
    id: 4,
    title: "Portfolio",
    description: "This site.",
    techStack: ["Next.js"],
    liveUrl: "https://saix.in/",
    githubUrl: "https://github.com/saitadikonda99/saix.in",
  },
  {
    id: 5,
    title: "Agency Website",
    description: "Professional agency website for Kivas software services.",
    techStack: ["Next.js"],
    liveUrl: "https://kivas.saitadikonda.in/",
    githubUrl: "https://github.com/saitadikonda99/Agency",
  },
];

const Projects = () => {
  return (
    <div>
      <div className="inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-3">
        things i&apos;ve built
      </div>
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
};

export default Projects;
