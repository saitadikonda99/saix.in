import { NextResponse } from "next/server";

// Simple in-memory store for visitor stats (resets on server restart)
// For production, use Redis or a database
const visitorStore = {
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

function getDailyCounts(): number[] {
  const keys = Array.from({ length: 7 }, (_, i) => getDayKey(6 - i));
  return keys.map(k => visitorStore.daily.get(k) ?? 0);
}

export async function GET() {
  const weekKey = getWeekKey();
  const [total, weekly, dailyCounts] = [
    visitorStore.total,
    visitorStore.weekly,
    getDailyCounts(),
  ];
  return NextResponse.json({ total, weeklyDelta: weekly, dailyCounts });
}

export async function POST() {
  const weekKey = getWeekKey();
  const dayKey = getDayKey();
  
  visitorStore.total = (visitorStore.total ?? 0) + 1;
  visitorStore.weekly = (visitorStore.weekly ?? 0) + 1;
  visitorStore.daily.set(dayKey, (visitorStore.daily.get(dayKey) ?? 0) + 1);
  
  const dailyCounts = getDailyCounts();
  return NextResponse.json({ total: visitorStore.total, weeklyDelta: visitorStore.weekly, dailyCounts });
}