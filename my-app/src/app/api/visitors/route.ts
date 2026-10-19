import { NextResponse } from "next/server";
import {
  VISITOR_TOTAL_KEY,
  ensureVisitorSchema,
  incrementVisitStats,
  readVisitCounts,
} from "@/lib/visitor-stats";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

// Fallback store used only when Supabase is unreachable, so the badge
// still renders instead of erroring out.
const fallbackStore = {
  total: 0,
  weekly: 0,
  daily: new Map<string, number>(),
};

function getWeekKey(): string {
  const d = new Date();
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `visitors:week:${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function getDayKey(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  return `visitors:day:${utc.getUTCFullYear()}-${String(utc.getUTCMonth() + 1).padStart(2, "0")}-${String(utc.getUTCDate()).padStart(2, "0")}`;
}

/** Last 7 day keys in chronological order (oldest first, today last). */
function getRecentDayKeys(): string[] {
  return Array.from({ length: 7 }, (_, i) => getDayKey(6 - i));
}

function fallbackSnapshot(weekKey: string, dayKeys: string[]) {
  return {
    total: fallbackStore.total,
    weeklyDelta: fallbackStore.weekly,
    dailyCounts: dayKeys.map((k) => fallbackStore.daily.get(k) ?? 0),
  };
}

async function snapshot(weekKey: string, dayKeys: string[]) {
  try {
    const schemaReady = await ensureVisitorSchema();
    if (!schemaReady) return fallbackSnapshot(weekKey, dayKeys);

    const counts = await readVisitCounts([VISITOR_TOTAL_KEY, weekKey, ...dayKeys]);
    return {
      total: counts.get(VISITOR_TOTAL_KEY) ?? 0,
      weeklyDelta: counts.get(weekKey) ?? 0,
      dailyCounts: dayKeys.map((k) => counts.get(k) ?? 0),
    };
  } catch (error) {
    console.error("Visitor stats read failed, using fallback:", error);
    return fallbackSnapshot(weekKey, dayKeys);
  }
}

export async function GET() {
  const stats = await snapshot(getWeekKey(), getRecentDayKeys());
  return NextResponse.json(stats, { headers: NO_STORE });
}

export async function POST() {
  const weekKey = getWeekKey();
  const dayKeys = getRecentDayKeys();
  const todayKey = dayKeys[dayKeys.length - 1];

  try {
    const schemaReady = await ensureVisitorSchema();
    if (!schemaReady) throw new Error("visitor_stats table unavailable");

    await incrementVisitStats([VISITOR_TOTAL_KEY, weekKey, todayKey]);
  } catch (error) {
    console.error("Visitor increment failed, using in-memory fallback:", error);
    fallbackStore.total += 1;
    fallbackStore.weekly += 1;
    fallbackStore.daily.set(todayKey, (fallbackStore.daily.get(todayKey) ?? 0) + 1);
    return NextResponse.json(fallbackSnapshot(weekKey, dayKeys), { headers: NO_STORE });
  }

  const stats = await snapshot(weekKey, dayKeys);
  return NextResponse.json(stats, { headers: NO_STORE });
}
