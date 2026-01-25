"use client";

import Navbar from "@/components/navbar/navbar";
import About from "@/components/ui/about";
import Social from "@/components/social/social";
import Projects from "@/components/projects/projects";
import Skills from "@/components/skills/skills";


export default function Home() {
  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto bg-background text-textPrimary py-2 sm:py-4 px-4 sm:px-0">
      <Navbar />
      <About />
      <Social />
      <Skills />
      <Projects />
    </div>
  );
}
