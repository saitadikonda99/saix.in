import { prisma } from "@/lib/prisma";

let ensured = false;
let ensuring: Promise<void> | null = null;

/**
 * Split a SQL script into individual statements while respecting
 * dollar-quoted blocks ($$ ... $$, $fn$ ... $fn$) and single quotes.
 * Prisma's $executeRawUnsafe cannot run multiple statements at once.
 */
function splitSql(sql: string): string[] {
  const out: string[] = [];
  let current = "";
  let dollarTag: string | null = null;
  let inSingle = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];

    if (dollarTag) {
      if (sql.startsWith(dollarTag, i)) {
        current += dollarTag;
        i += dollarTag.length - 1;
        dollarTag = null;
      } else {
        current += ch;
      }
      continue;
    }

    if (inSingle) {
      current += ch;
      if (ch === "'") {
        if (sql[i + 1] === "'") {
          current += "'";
          i++;
        } else {
          inSingle = false;
        }
      }
      continue;
    }

    if (ch === "'") {
      inSingle = true;
      current += ch;
      continue;
    }

    if (ch === "$") {
      const match = sql.slice(i).match(/^\$[A-Za-z0-9_]*\$/);
      if (match) {
        dollarTag = match[0];
        current += dollarTag;
        i += dollarTag.length - 1;
        continue;
      }
    }

    if (ch === ";") {
      const stmt = current.trim();
      if (stmt) out.push(stmt);
      current = "";
      continue;
    }

    current += ch;
  }

  const stmt = current.trim();
  if (stmt) out.push(stmt);
  return out;
}

const DDL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS vault_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'default-user',
  personal JSONB NOT NULL DEFAULT '{}',
  documents JSONB NOT NULL DEFAULT '[]',
  settings JSONB NOT NULL DEFAULT '{"autoLockMinutes": 10}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_vault_data_user_id_unique ON vault_data(user_id);

ALTER TABLE vault_data ENABLE ROW LEVEL SECURITY;

DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'vault_data'
      AND policyname = 'Enable read access for own vault'
  ) THEN
    CREATE POLICY "Enable read access for own vault" ON vault_data
      FOR SELECT USING (user_id = 'default-user');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'vault_data'
      AND policyname = 'Enable insert for own vault'
  ) THEN
    CREATE POLICY "Enable insert for own vault" ON vault_data
      FOR INSERT WITH CHECK (user_id = 'default-user');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'vault_data'
      AND policyname = 'Enable update for own vault'
  ) THEN
    CREATE POLICY "Enable update for own vault" ON vault_data
      FOR UPDATE USING (user_id = 'default-user');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'vault_data'
      AND policyname = 'Enable delete for own vault'
  ) THEN
    CREATE POLICY "Enable delete for own vault" ON vault_data
      FOR DELETE USING (user_id = 'default-user');
  END IF;
END
$do$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $fn$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$fn$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_vault_data_updated_at ON vault_data;

CREATE TRIGGER update_vault_data_updated_at
  BEFORE UPDATE ON vault_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
`;

/**
 * Ensures the vault_data table exists. Safe to call on every request:
 * it only runs once per server process. If DATABASE_URL is missing or the
 * database is unreachable, it fails silently so the app can fall back to
 * localStorage instead of returning a 500.
 */
export async function ensureVaultSchema(): Promise<boolean> {
  if (ensured) return true;
  if (ensuring) {
    await ensuring;
    return ensured;
  }

  ensuring = (async () => {
    try {
      const statements = splitSql(DDL);

      for (const statement of statements) {
        try {
          await prisma.$executeRawUnsafe(statement);
        } catch (error) {
          // Some statements can fail harmlessly on restricted DB roles
          // (e.g. extension already exists). Keep going unless it's the table.
          if (/CREATE TABLE/i.test(statement)) throw error;
          console.warn("vault schema statement skipped:", (error as Error).message);
        }
      }

      // Ask PostgREST to refresh its schema cache so Supabase sees the table
      try {
        await prisma.$executeRawUnsafe("NOTIFY pgrst, 'reload schema'");
      } catch {
        // NOTIFY is optional
      }

      ensured = true;
    } catch (error) {
      console.error("ensureVaultSchema failed:", error);
      ensured = false;
    } finally {
      ensuring = null;
    }
  })();

  await ensuring;
  return ensured;
}
