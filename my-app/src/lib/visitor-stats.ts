import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const VISITOR_TOTAL_KEY = "visitors:total";

let ensured = false;
let ensuring: Promise<void> | null = null;

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS visitor_stats (
    id TEXT PRIMARY KEY,
    count BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  // Service-only table: RLS on, no public policies. Prisma (table owner)
  // still has full access; anon/authenticated keys get nothing.
  `ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY`,
];

/**
 * Ensures the visitor_stats table exists. Safe to call on every request:
 * it only runs once per server process. Fails silently (returns false) so
 * the API can fall back to in-memory counters if the DB is unreachable.
 */
export async function ensureVisitorSchema(): Promise<boolean> {
  if (ensured) return true;
  if (ensuring) {
    await ensuring;
    return ensured;
  }

  ensuring = (async () => {
    try {
      for (const statement of STATEMENTS) {
        await prisma.$executeRawUnsafe(statement);
      }

      // Ask PostgREST to refresh its schema cache
      try {
        await prisma.$executeRawUnsafe("NOTIFY pgrst, 'reload schema'");
      } catch {
        // NOTIFY is optional
      }

      ensured = true;
    } catch (error) {
      console.error("ensureVisitorSchema failed:", error);
      ensured = false;
    } finally {
      ensuring = null;
    }
  })();

  await ensuring;
  return ensured;
}

/**
 * Atomically increments each key's counter. A single upsert statement per
 * key keeps concurrent requests safe (no lost updates across instances).
 */
export async function incrementVisitStats(keys: string[]): Promise<void> {
  await Promise.all(
    keys.map(
      (key) => prisma.$executeRaw`
        INSERT INTO visitor_stats (id, count, updated_at)
        VALUES (${key}, 1, NOW())
        ON CONFLICT (id) DO UPDATE
        SET count = visitor_stats.count + 1, updated_at = NOW()
      `
    )
  );
}

/** Reads counters for the given keys. Missing keys are simply absent. */
export async function readVisitCounts(keys: string[]): Promise<Map<string, number>> {
  const rows = await prisma.$queryRaw<Array<{ id: string; count: bigint }>>`
    SELECT id, count FROM visitor_stats WHERE id IN (${Prisma.join(keys)})
  `;
  return new Map(rows.map((row) => [row.id, Number(row.count)]));
}
