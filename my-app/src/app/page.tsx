import About from "@/components/ui/about/about";
import Experience from "@/components/ui/experience/experience";
import Skills from "@/components/ui/skills/skills";
import Social from "@/components/ui/social/social";
import Projects from "@/components/ui/projects/projects";
import Blogs from "@/components/ui/blogs/blogs";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <>
<main className="max-w-[580px] mx-auto px-6 pt-16 pb-28 flex flex-col gap-10">
        <About />
        <Experience />
        <Skills />
        <Social />
        <hr className="border-border-primary" />
        <Projects />
        <Blogs />
        <Footer />
      </main>
    </>
  );
}
