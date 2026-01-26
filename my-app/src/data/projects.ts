export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Enterprise Event Management Platform",
    description: "Developed an Enterprise Management System for the Student Activity Center at KL Deemed-to-be University to centrally manage and monitor all student clubs and activities.",
    techStack: ["Next.js", "Node.js", "TypeScript", "MySQL", "Docker", "Redis"],
    liveUrl: "https://sac.kluniversity.in/",
    githubUrl: "https://github.com/saitadikonda99/Kepler-452b"
  },
  {
    id: 2,
    title: "Application Tracker",
    description: "Track and manage your job applications efficiently.",
    techStack: ["Next.js", "Supabase", "Prisma"],
    liveUrl: "https://jobtracker13.vercel.app",
    githubUrl: "https://github.com/saitadikonda99/ApplicationTracker"
  },
  {
    id: 3,
    title: "Cache Db Lyte",
    description: "Lightweight caching database solution.",
    techStack: ["Node.js"],
    liveUrl: "https://github.com/saitadikonda99/Own-Cache-Database",
    githubUrl: "https://github.com/saitadikonda99/Own-Cache-Database"
  },
  {
    id: 4,
    title: "Portfolio",
    description: "Personal portfolio website showcasing projects and skills.",
    techStack: ["Next.js"],
    liveUrl: "https://portfolio.vercel.app/",
    githubUrl: "https://github.com/saitadikonda99/saix.in"
  },
  {
    id: 5,
    title: "Agency Website",
    description: "Professional agency website for Kivas software services.",
    techStack: ["Next.js"],
    liveUrl: "https://kivas.saitadikonda.in/",
    githubUrl: "https://github.com/saitadikonda99/Agency"
  }
];
