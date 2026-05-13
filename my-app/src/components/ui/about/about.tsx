import Link from "next/link";
import SectionTag from "@/components/ui/section-tag";

const RESUME_URL = "https://drive.google.com/file/d/19JVRbP53htxUW6oULB_aI7XLyJjX43Te";

const About = () => (
  <div className="flex flex-col gap-5">
    <h1 className="text-[1.4rem] font-bold text-text-primary">hi! i&apos;m sai.</h1>
    <div>
      <div className="flex items-center gap-3 mb-3">
        <SectionTag className="mb-0">about</SectionTag>
        <Link
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hl-link text-text-secondary text-[0.8rem]"
        >
          resume ↗
        </Link>
      </div>
      <p className="text-text-primary">
        I&apos;m a Full-Stack Developer passionate about crafting high-performance,
        scalable web applications. With expertise in{" "}
        <span className="hl-mark">Next.js</span>,{" "}
        <span className="hl-mark">React</span>,{" "}
        <span className="hl-mark">Node.js</span>, and{" "}
        <span className="hl-mark">Go</span>,
        I specialize in building seamless digital experiences and optimizing system
        performance for real-world impact.
      </p>
    </div>
  </div>
);

export default About;
