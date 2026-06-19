import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

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

async function getDailyCounts(): Promise<number[]> {
  const keys = Array.from({ length: 7 }, (_, i) => getDayKey(6 - i));
  const values = await Promise.all(keys.map((k) => redis.get<number>(k)));
  return values.map((v) => v ?? 0);
}

export async function GET() {
  const weekKey = getWeekKey();
  const [total, weekly, dailyCounts] = await Promise.all([
    redis.get<number>("visitors:total"),
    redis.get<number>(weekKey),
    getDailyCounts(),
  ]);
  return NextResponse.json({ total: total ?? 0, weeklyDelta: weekly ?? 0, dailyCounts });
}

export async function POST() {
  const weekKey = getWeekKey();
  const dayKey = getDayKey();
  const [total, weekly] = await Promise.all([
    redis.incr("visitors:total"),
    redis.incr(weekKey),
    redis.incr(dayKey),
  ]);
  await Promise.all([
    redis.expire(weekKey, 14 * 24 * 60 * 60),
    redis.expire(dayKey, 32 * 24 * 60 * 60),
  ]);
  const dailyCounts = await getDailyCounts();
  return NextResponse.json({ total, weeklyDelta: weekly, dailyCounts });
}
