import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Tadikonda Sai Manikanta",
};

const FILE_ID = "1zULEEtIYHqG4PPIyghxImB15GUjMx7sg";
const DRIVE_EMBED = `https://drive.google.com/file/d/${FILE_ID}/preview`;
const DRIVE_DOWNLOAD = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export default function ResumePage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between px-5 py-3 border-b border-border-primary shrink-0">
        <Link href="/" className="hl-link text-text-secondary text-[0.8rem]">
          ← saix.in
        </Link>
        <span className="text-text-primary text-[0.8rem] font-medium">resume</span>
        <a
          href={DRIVE_DOWNLOAD}
          className="hl-link text-text-secondary text-[0.8rem]"
        >
          download ↓
        </a>
      </header>
      <iframe
        src={DRIVE_EMBED}
        className="flex-1 w-full border-none"
        allow="autoplay"
        title="Tadikonda Sai Manikanta — Resume"
      />
    </div>
  );
}
