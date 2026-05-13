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
      <div className="px-5 pt-8">
        <span
          className="hl-hover font-bold text-[1.5rem] text-text-primary"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Sai Tadikonda
        </span>
      </div>

      <main className="max-w-[580px] mx-auto px-6 pt-8 pb-16 flex flex-col gap-8">
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
