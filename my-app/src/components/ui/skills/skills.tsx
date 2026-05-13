const skillList = [
  "JavaScript", "TypeScript", "Golang", "Java",
  "React", "Next.js", "Node.js", "Git", "Docker", "MySQL", "Redis",
];

const Skills = () => {
  return (
    <div>
      <div className="inline-block bg-[#f2f0e5] dark:bg-[#242424] text-text-primary px-2 py-0.5 text-[0.8rem] mb-3">
        skills
      </div>
      <p className="text-text-primary">{skillList.join(", ")}</p>
    </div>
  );
};

export default Skills;
