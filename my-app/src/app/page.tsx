import About from "@/components/ui/about/about";
import Experience from "@/components/ui/experience/experience";
import Skills from "@/components/ui/skills/skills";
import Social from "@/components/ui/social/social";
import Projects from "@/components/ui/projects/projects";
import AskAI from "@/components/ui/ask-ai/ask-ai";
import Blogs from "@/components/ui/blogs/blogs";
import Footer from "@/components/footer/footer";
import VisitorBadge from "@/components/ui/visitor-badge/visitor-badge";

export default function Home() {
  return (
    <>
      <div className="px-5 pt-4">
        <span
          className="hl-hover font-extrabold text-[1.5rem] text-black"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Tadikonda Sai Manikanta
        </span>
        <VisitorBadge />
      </div>

      <main className="max-w-[580px] mx-auto px-6 pt-5 pb-10 flex flex-col gap-5">
        <About />
        <Experience />
        <Skills />
        <Social />
        <hr className="border-border-primary" />
        <Projects />
        <AskAI />
        <Blogs />
        <Footer />
      </main>
    </>
  );
}
