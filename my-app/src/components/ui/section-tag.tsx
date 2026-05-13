const SectionTag = ({
  children,
  noMargin = false,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) => (
  <div
    className={`inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] ${noMargin ? "" : "mb-3"}`}
  >
    {children}
  </div>
);

export default SectionTag;
