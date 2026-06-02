import Link from "next/link";
import SectionTag from "@/components/ui/section-tag";

const AI_LINKS = [
  {
    label: "Ask ChatGPT",
    url: "https://chatgpt.com/?q=Review%20saix.in.%20Act%20as%20a%20startup%20CTO%20hiring%20a%20full-stack%20engineer.%20Evaluate%20technical%20skills,%20product%20thinking,%20project%20quality,%20communication,%20strengths,%20weaknesses,%20and%20whether%20you%20would%20hire%20or%20interview%20Tadikonda%20Sai%20Manikanta.",
  },
  {
    label: "Ask Claude",
    url: "https://claude.ai/new?q=Review%20saix.in%20and%20provide%20a%20detailed%20assessment%20of%20Tadikonda%20Sai%20Manikanta%20as%20a%20software%20engineer,%20founding%20engineer,%20and%20startup%20hire.",
  },
  {
    label: "Ask Perplexity",
    url: "https://www.perplexity.ai/search/new?q=Review%20saix.in%20and%20evaluate%20whether%20Tadikonda%20Sai%20Manikanta%20would%20be%20a%20strong%20engineering%20hire.",
  },
];

const AskAI = () => (
  <div>
    <SectionTag>ask ai</SectionTag>
    <div className="flex flex-col gap-3">
      <p className="text-text-primary font-bold" style={{ fontFamily: "var(--font-merriweather)" }}>
        Still evaluating me?
      </p>
      <p className="text-text-secondary">
        Let ChatGPT, Claude, or Perplexity review my work, projects, and engineering experience.
      </p>
      <div className="flex flex-wrap gap-2 mt-1">
        {AI_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-border-primary px-3 py-1 text-text-primary text-[0.8rem] transition-colors duration-150 hover:bg-[#ffd00066]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default AskAI;
