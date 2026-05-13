const SectionTag = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-3 ${className}`}>
    {children}
  </div>
);

export default SectionTag;
