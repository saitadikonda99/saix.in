import Link from "next/link";
import SectionTag from "@/components/ui/section-tag";
import { socialLinks } from "@/data/social";

const contactLinks = socialLinks.filter((l) => l.label !== "Email");
const email = socialLinks.find((l) => l.label === "Email")!;

const Social = () => (
  <div>
    <SectionTag>contact</SectionTag>
    <p className="text-text-primary">
      Find me on{" "}
      {contactLinks.map((link, i) => (
        <span key={link.label}>
          <Link href={link.url} target="_blank" rel="noopener noreferrer" className="hl-link">
            {link.label}
          </Link>
          {i < contactLinks.length - 2 ? ", " : i === contactLinks.length - 2 ? " or " : ""}
        </span>
      ))}
      {", or "}
      <Link href={email.url} className="hl-link">email me</Link>.
    </p>
  </div>
);

export default Social;
