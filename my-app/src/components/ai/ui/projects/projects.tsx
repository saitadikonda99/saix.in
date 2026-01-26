"use client";
import React from 'react'
import { projectsData } from '@/data/projects'

const Projects = () => {
  return (
    <div className="w-full border-r-1 border-l-1 border-border-ai relative">
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white"></div>
      <div className="w-full px-4 py-2">
        <button className="text-white text-[.8rem]">## PROJECTS</button>
        {projectsData.map((project) => (
          <div key={project.id} className="mb-8 last:mb-0">
            <div className="flex items-start gap-2">
              <span className="text-white text-[.8rem]">-</span>
              <div className="flex-1">
                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white my-1 font-mono text-[.8rem]"
                >
                  [{project.title.toUpperCase()}]
                </a>
                {project.liveUrl && (
                  <p className="text-white text-[.8rem] pb-1 font-mono">
                    Live: ({project.liveUrl})
                  </p>
                )}
                {project.githubUrl && (
                  <p className="text-white text-[.8rem] pb-2 font-mono">
                    GitHub: ({project.githubUrl})
                  </p>
                )}
                <p className="text-white text-[.8rem] pb-2 font-mono">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 pb-1 flex-wrap">
                  <span className="text-white text-[.8rem]">Tech Stack:</span>
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-[#484b4d] text-white px-1 py-0 text-[.8rem] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
