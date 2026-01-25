"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { Github, Globe } from 'lucide-react'

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

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleProjects = projectsData.slice(0, visibleCount);
  const hasMore = projectsData.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(projectsData.length);
  };

  return (
    <div className="w-full py-10">
      <div className="w-full flex flex-col items-center justify-between gap-4">
        <div className="w-full py-4">
          <h2 className="text-text-primary text-[1.2rem] font-bold">Projects</h2>
        </div>
        
        <div className="w-full flex flex-col items-center justify-between gap-4">
          {visibleProjects.map((project) => (
            <div key={project.id} className="w-full bg-background border-1 border-border-primary">
              <div className="w-full p-4">
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="w-fit">
                    <p className="border-b-2 border-orange py-1 text-sm text-text-primary">{project.title}</p>
                  </div>
                  <div className="w-fit">
                    <div className="w-full flex items-center justify-start gap-3">
                      {project.liveUrl && (
                        <Link 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-text-secondary text-[.8rem] font-bold underline hover:text-text-primary transition-all duration-300 flex items-center gap-1"
                        >
                          <Globe size={14} />
                          Live
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-text-secondary text-[.8rem] font-bold underline hover:text-text-primary transition-all duration-300 flex items-center gap-1"
                        >
                          <Github size={14} />
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full text-[.8rem] py-2">
                  <p className="text-text-primary">{project.description}</p>
                </div>
                <div className="w-full">
                  <p className="text-text-secondary text-[.8rem] font-bold py-2">Tech Stack</p>
                  <div className="w-full flex flex-wrap items-center justify-start gap-2">
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-background border-1 border-border-primary px-2 py-1 text-text-primary text-[.8rem]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {hasMore && visibleCount === 3 && (
            <div className="w-full flex justify-end">
              <button
                onClick={handleLoadMore}
                className="text-text-secondary text-[.8rem] font-bold underline hover:text-text-primary transition-all duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects