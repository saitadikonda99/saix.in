const SectionTag = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-3">
    {children}
  </div>
);

const About = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[1.4rem] font-bold text-text-primary">hi! i&apos;m sai.</h1>

      <div>
        <SectionTag>about</SectionTag>
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
};

export default About;
