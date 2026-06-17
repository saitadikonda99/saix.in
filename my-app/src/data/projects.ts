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
    id: 0,
    title: "bluedate.io",
    description: "Connecting people through shared interests and events.",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    liveUrl: "https://bluedate.io",
  },
  {
    id: 1,
    title: "Enterprise Event Management Platform",
    description: "Enterprise system for KL University's Student Activity Center to manage clubs and activities.",
    techStack: ["Next.js", "Node.js", "TypeScript", "MySQL", "Docker", "Redis"],
    liveUrl: "https://sac.kluniversity.in",
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
  {
    id: 6,
    title: "Context Graph System",
    description: "Context graph system with an LLM-powered query interface.",
    techStack: ["Next.js", "Node.js"],
    liveUrl: "https://dodgeai.saix.in/",
  },
  {
    id: 7,
    title: "AirClipboard",
    description: "Universal clipboard for Android and macOS. Copy on one device, paste on another over local Wi-Fi.",
    techStack: ["Android", "macOS", "Swift", "Kotlin"],
    githubUrl: "https://github.com/saitadikonda99/AirClipboard",
  },
];
