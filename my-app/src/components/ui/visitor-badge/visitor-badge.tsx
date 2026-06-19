"use client";

import { useEffect, useState } from "react";

interface VisitorData {
  total: number;
  weeklyDelta: number;
  dailyCounts: number[];
}

function Sparkline({ data }: { data: number[] }) {
  const w = 44;
  const h = 18;
  const max = Math.max(...data, 1);
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - (v / max) * (h - 2) - 1,
  ]);

  // smooth cubic bezier through points
  const d = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt[0]},${pt[1]}`;
    const prev = pts[i - 1];
    const cpx = (prev[0] + pt[0]) / 2;
    return `${acc} C ${cpx},${prev[1]} ${cpx},${pt[1]} ${pt[0]},${pt[1]}`;
  }, "");

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="inline align-middle ml-0.5"
      aria-hidden
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VisitorBadge() {
  const [data, setData] = useState<VisitorData | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visited");
    const method = alreadyCounted ? "GET" : "POST";

    fetch("/api/visitors", { method })
      .then((r) => r.json())
      .then((d: VisitorData) => {
        setData(d);
        if (!alreadyCounted) sessionStorage.setItem("visited", "1");
      })
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <p className="text-sm text-neutral-500 mt-0.5">
      Welcome! You&apos;re visitor{" "}
      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
        #{data.total.toLocaleString()}
      </span>{" "}
      <span className="text-emerald-500 font-medium">
        +{data.weeklyDelta.toLocaleString()} this week{" "}
        <Sparkline data={data.dailyCounts} />
      </span>
    </p>
  );
}
