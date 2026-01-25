"use client";
import React from "react"

const Navbar = () => {
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full py-4 sticky top-0 z-50 bg-background">
      <div className="w-full border-r-1 border-l-1 border-border-primary">
      <div className="w-full bg-background px-4 py-1 flex items-center justify-between">
        <div className="w-fit">
          <button 
            onClick={() => handleScrollTo('about')}
            className="font-michroma font-[900] text-[1rem] text-text-primary sm:text-[1.4rem] cursor-pointer hover:text-text-primary transition-colors"
          >
            Sai Tadikonda
          </button>
        </div>

        <div className="w-fit flex items-center justify-between gap-6">
          <div className="w-fit items-center justify-center gap-4 hidden sm:flex">
            <button 
              onClick={() => handleScrollTo('skills')}
              className="text-text-secondary text-sm hover:text-text-primary transition-all duration-300"
            >
              Skills
            </button>
            <button 
              onClick={() => handleScrollTo('projects')}
              className="text-text-secondary text-sm hover:text-text-primary transition-all duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => handleScrollTo('blogs')}
              className="text-text-secondary text-sm hover:text-text-primary transition-all duration-300"
            >
              Blogs
            </button>
          </div>

          <div className="w-fit flex items-center gap-4">
            <button 
              onClick={() => handleScrollTo('social')}
              className="bg-button-primary text-white px-4 py-2 rounded-md sm:block hidden"
            >
              CONTACT
            </button>
            <button className="bg-orange text-white px-4 py-2 rounded-md">RESUME</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar