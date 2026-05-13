"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHuman = pathname === "/";
  const isMachine = pathname === "/ai";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
      <span
        className="hl-hover font-bold text-[1.5rem] text-text-primary"
        style={{ fontFamily: "var(--font-merriweather)" }}
      >
        Sai Tadikonda
      </span>

      <div className="bg-[#484b4d] rounded-[4px] px-2 py-1 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1">
          <span className="w-[7px] h-[7px] border border-white rounded-full flex items-center justify-center">
            <span className={`w-[3px] h-[3px] rounded-full ${isHuman ? "bg-white" : "bg-[#484b4d]"}`} />
          </span>
          <span className="text-white text-[0.65rem] tracking-wide">HUMAN</span>
        </Link>
        <Link href="/ai" className="flex items-center gap-1">
          <span className="w-[7px] h-[7px] border border-white rounded-full flex items-center justify-center">
            <span className={`w-[3px] h-[3px] rounded-full ${isMachine ? "bg-white" : "bg-[#484b4d]"}`} />
          </span>
          <span className="text-white text-[0.65rem] tracking-wide">MACHINE</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
