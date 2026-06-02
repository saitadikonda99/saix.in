export interface Job {
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

export const experienceData: Job[] = [
  {
    id: 1,
    title: "Founding Engineer",
    company: "bluedate.io",
    type: "Full-time",
    period: "Jan 2026 – Present",
    duration: "7 mos",
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
    companyUrl: "https://github.com/saitadikonda99/Kepler-452b",
  },
];
