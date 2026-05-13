interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  mode: string;
  companyUrl?: string;
}

const experienceData: Job[] = [
  {
    id: 1,
    title: "Founding Engineer",
    company: "bluedate.io",
    type: "Full-time",
    period: "Jan 2026 – Present",
    duration: "5 mos",
    location: "Vijayawada, India",
    mode: "Remote",
    companyUrl: "https://bluedate.io",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Student Activity Centre – KL University",
    type: "Internship",
    period: "Jan 2025 – Jun 2025",
    duration: "6 mos",
    location: "Vijayawada, India",
    mode: "On-site",
    companyUrl: "https://sac.kluniversity.in",
  },
];

const Experience = () => {
  return (
    <div>
      <div className="inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-4">
        work
      </div>
      <div className="flex flex-col gap-6">
        {experienceData.map((job) => (
          <div key={job.id}>
            <p className="text-text-primary font-medium">{job.title}</p>
            <p className="text-text-secondary">
              {job.companyUrl ? (
                <a
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hl-link text-text-secondary"
                >
                  {job.company}
                </a>
              ) : (
                job.company
              )}
              {" · "}
              {job.type}
            </p>
            <p className="text-text-secondary">
              {job.period} · {job.duration}
            </p>
            <p className="text-text-secondary">
              {job.location} · {job.mode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
