"use client";

import Navbar from "@/components/navbar/navbar";
import About from "@/components/ui/about/about";
import Skills from "@/components/ui/skills/skills";
import Social from "@/components/ui/social/social";
import Projects from "@/components/ui/projects/projects";
import Blogs from "@/components/ui/blogs/blogs";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto bg-background text-textPrimary py-2 sm:py-4 px-4 sm:px-0 flex flex-col items-start justify-center gap-15">
      <Navbar />
      <div id="about" className="w-full">
        <About />
      </div>
      <div id="social" className="w-full">
        <Social />
      </div>
      <div id="skills" className="w-full">
        <Skills />
      </div>
      <div id="projects" className="w-full">
        <Projects />
      </div>
      <div id="blogs" className="w-full">
        <Blogs />
      </div>
      <Footer />
    </div>
  );
}
