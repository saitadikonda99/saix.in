import Link from "next/link";
import SectionTag from "@/components/ui/section-tag";
import { experienceData } from "@/data/experience";

const Experience = () => (
  <div>
    <SectionTag>work</SectionTag>
    <div className="flex flex-col gap-6">
      {experienceData.map((job) => (
        <div key={job.id}>
          <p className="text-text-primary font-medium">{job.title}</p>
          <p className="text-text-secondary">
            {job.companyUrl ? (
              <Link href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="hl-link text-text-secondary">
                {job.company}
              </Link>
            ) : (
              job.company
            )}
            {" · "}{job.type}
          </p>
          <p className="text-text-secondary">{job.period} · {job.duration}</p>
          <p className="text-text-secondary">{job.location} · {job.mode}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Experience;
