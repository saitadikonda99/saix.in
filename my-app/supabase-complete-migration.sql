-- ============================================
-- COMPLETE SUPABASE MIGRATION FOR WALLET
-- Copy-paste this ENTIRE file into Supabase SQL Editor and RUN
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: vault_data (Main vault table)
-- ============================================
CREATE TABLE IF NOT EXISTS vault_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'default-user',
  personal JSONB NOT NULL DEFAULT '{}',
  documents JSONB NOT NULL DEFAULT '[]',
  settings JSONB NOT NULL DEFAULT '{"autoLockMinutes": 10}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vault_data_user_id ON vault_data(user_id);

-- Required for Supabase upsert(onConflict: "user_id")
CREATE UNIQUE INDEX IF NOT EXISTS idx_vault_data_user_id_unique ON vault_data(user_id);

-- Enable RLS
ALTER TABLE vault_data ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Enable read access for own vault" ON vault_data;
DROP POLICY IF EXISTS "Enable insert for own vault" ON vault_data;
DROP POLICY IF EXISTS "Enable update for own vault" ON vault_data;
DROP POLICY IF EXISTS "Enable delete for own vault" ON vault_data;

-- RLS Policies - Only allow access to own data (user_id = 'default-user')
CREATE POLICY "Enable read access for own vault" ON vault_data
  FOR SELECT USING (user_id = 'default-user');

CREATE POLICY "Enable insert for own vault" ON vault_data
  FOR INSERT WITH CHECK (user_id = 'default-user');

CREATE POLICY "Enable update for own vault" ON vault_data
  FOR UPDATE USING (user_id = 'default-user');

CREATE POLICY "Enable delete for own vault" ON vault_data
  FOR DELETE USING (user_id = 'default-user');

-- ============================================
-- TABLE: wallet_records (Legacy - for reference)
-- ============================================
CREATE TABLE IF NOT EXISTS wallet_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'default-user',
  category TEXT NOT NULL CHECK (category IN (
    'PERSONAL_DETAILS',
    'CONTACT_INFORMATION',
    'INDIAN_IDENTITY_DOCUMENTS',
    'BANKING_FINANCE',
    'EDUCATION',
    'CAREER_EMPLOYMENT',
    'SOCIAL_LINKS',
    'DOCUMENTS_FILES',
    'OTHER_RECORDS'
  )),
  title TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  file_links JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_records_user_id ON wallet_records(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_records_category ON wallet_records(category);
CREATE INDEX IF NOT EXISTS idx_wallet_records_updated_at ON wallet_records(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_records_title_search ON wallet_records USING GIN (to_tsvector('english', title));

ALTER TABLE wallet_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for own records" ON wallet_records;
DROP POLICY IF EXISTS "Enable insert for own records" ON wallet_records;
DROP POLICY IF EXISTS "Enable update for own records" ON wallet_records;
DROP POLICY IF EXISTS "Enable delete for own records" ON wallet_records;

CREATE POLICY "Enable read access for own records" ON wallet_records
  FOR SELECT USING (user_id = 'default-user');

CREATE POLICY "Enable insert for own records" ON wallet_records
  FOR INSERT WITH CHECK (user_id = 'default-user');

CREATE POLICY "Enable update for own records" ON wallet_records
  FOR UPDATE USING (user_id = 'default-user');

CREATE POLICY "Enable delete for own records" ON wallet_records
  FOR DELETE USING (user_id = 'default-user');

-- ============================================
-- TABLE: wallet_sessions (For session management)
-- ============================================
CREATE TABLE IF NOT EXISTS wallet_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'default-user',
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_sessions_expires_at ON wallet_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_wallet_sessions_token_hash ON wallet_sessions(token_hash);

ALTER TABLE wallet_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for own sessions" ON wallet_sessions;
DROP POLICY IF EXISTS "Enable insert for own sessions" ON wallet_sessions;
DROP POLICY IF EXISTS "Enable delete for own sessions" ON wallet_sessions;

CREATE POLICY "Enable read access for own sessions" ON wallet_sessions
  FOR SELECT USING (user_id = 'default-user');

CREATE POLICY "Enable insert for own sessions" ON wallet_sessions
  FOR INSERT WITH CHECK (user_id = 'default-user');

CREATE POLICY "Enable delete for own sessions" ON wallet_sessions
  FOR DELETE USING (user_id = 'default-user');

-- ============================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS update_vault_data_updated_at ON vault_data;
CREATE TRIGGER update_vault_data_updated_at
  BEFORE UPDATE ON vault_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_wallet_records_updated_at ON wallet_records;
CREATE TRIGGER update_wallet_records_updated_at
  BEFORE UPDATE ON wallet_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKET: wallet-documents
-- Run this separately in Supabase Storage section, or via SQL:
-- ============================================
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES (
--   'wallet-documents',
--   'wallet-documents',
--   true,
--   52428800,
--   ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'text/plain', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
-- )
-- ON CONFLICT (id) DO UPDATE SET
--   public = true,
--   file_size_limit = 52428800,
--   allowed_mime_types = ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'text/plain', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

-- ============================================
-- VERIFY SETUP
-- ============================================
-- Run this to verify tables and policies exist:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('vault_data', 'wallet_records', 'wallet_sessions');
-- SELECT * FROM pg_policies WHERE tablename IN ('vault_data', 'wallet_records', 'wallet_sessions');