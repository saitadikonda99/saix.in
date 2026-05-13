import SectionTag from "@/components/ui/section-tag";
import { SKILLS } from "@/data/skills";

const Skills = () => (
  <div>
    <SectionTag>skills</SectionTag>
    <p className="text-text-primary">{SKILLS.join(", ")}</p>
  </div>
);

export default Skills;
