import Link from "next/link";

const links = [
  { label: "GitHub", url: "https://github.com/saitadikonda99" },
  { label: "LinkedIn", url: "https://linkedin.com/in/tadikondasaimanikanta" },
  { label: "Instagram", url: "https://instagram.com/_sai.you" },
  { label: "X", url: "https://x.com/sai_tadikonda_" },
];

const Social = () => {
  return (
    <div>
      <div className="inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-3">
        contact
      </div>
      <p className="text-text-primary">
        Find me on{" "}
        {links.map((link, i) => (
          <span key={link.label}>
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hl-link"
            >
              {link.label}
            </Link>
            {i < links.length - 2 ? ", " : i === links.length - 2 ? " or " : ""}
          </span>
        ))}
        {", or "}
        <Link
          href="mailto:saitadikonda.dev@gmail.com"
          className="hl-link"
        >
          email me
        </Link>
        .
      </p>
    </div>
  );
};

export default Social;
