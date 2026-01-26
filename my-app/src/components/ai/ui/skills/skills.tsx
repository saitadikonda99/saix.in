"use client";
import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SKILLS } from "@/data/skills";

const Skills = () => {
  const [copied, setCopied] = useState(false);

  const tableText = `
| Skills   |
|----------|
${SKILLS.map((s) => `| ${s.padEnd(8)} |`).join("\n")}
`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full border-r border-l border-border-ai px-4 py-1">
      <p className="text-white text-[.8rem] font-mono">## SKILLS</p>

      <table className="w-full bg-[#202020] border-collapse border border-zinc-600 my-2">
        <thead className="border border-zinc-600">
          <tr>
            <th className="w-full flex items-center justify-end p-3">
              <button
                onClick={handleCopy}
                className="text-zinc-400 hover:text-white transition flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <span className="text-xs">Copied</span>
                    <Check size={16} />
                  </>
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </th>
          </tr>
        </thead>

        <tbody className="text-white font-mono">
          {SKILLS.map((skill, i) => (
            <tr key={i} className="">
              <td className="px-4 py-1 text-[.8rem]">| {skill} |</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skills;
