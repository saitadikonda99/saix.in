"use client";

import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto bg-background text-textPrimary py-2 sm:py-4 px-4 sm:px-0">
      <Navbar />
    </div>
  );
}
