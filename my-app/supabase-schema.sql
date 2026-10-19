-- Supabase Database Setup for Personal Wallet
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create wallet_records table
CREATE TABLE wallet_records (
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

-- Create index for faster queries
CREATE INDEX idx_wallet_records_user_id ON wallet_records(user_id);
CREATE INDEX idx_wallet_records_category ON wallet_records(category);
CREATE INDEX idx_wallet_records_updated_at ON wallet_records(updated_at DESC);
CREATE INDEX idx_wallet_records_title_search ON wallet_records USING GIN (to_tsvector('english', title));

-- Create wallet_sessions table
CREATE TABLE wallet_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'default-user',
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_wallet_sessions_expires_at ON wallet_sessions(expires_at);
CREATE INDEX idx_wallet_sessions_token_hash ON wallet_sessions(token_hash);

-- Enable Row Level Security (RLS)
ALTER TABLE wallet_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for single-user access (using user_id = 'default-user')
-- For multi-user support, replace with auth.uid() checks

-- Wallet Records Policies
CREATE POLICY "Enable read access for own records" ON wallet_records
  FOR SELECT USING (user_id = 'default-user');

CREATE POLICY "Enable insert for own records" ON wallet_records
  FOR INSERT WITH CHECK (user_id = 'default-user');

CREATE POLICY "Enable update for own records" ON wallet_records
  FOR UPDATE USING (user_id = 'default-user');

CREATE POLICY "Enable delete for own records" ON wallet_records
  FOR DELETE USING (user_id = 'default-user');

-- Wallet Sessions Policies
CREATE POLICY "Enable read access for own sessions" ON wallet_sessions
  FOR SELECT USING (user_id = 'default-user');

CREATE POLICY "Enable insert for own sessions" ON wallet_sessions
  FOR INSERT WITH CHECK (user_id = 'default-user');

CREATE POLICY "Enable delete for own sessions" ON wallet_sessions
  FOR DELETE USING (user_id = 'default-user');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_wallet_records_updated_at
  BEFORE UPDATE ON wallet_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for record counts by category
CREATE VIEW wallet_category_counts AS
SELECT 
  category,
  COUNT(*) as record_count
FROM wallet_records
WHERE user_id = 'default-user'
GROUP BY category;

-- Create vault_data table for unified personal vault
CREATE TABLE vault_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL DEFAULT 'default-user',
  personal JSONB NOT NULL DEFAULT '{}',
  documents JSONB NOT NULL DEFAULT '[]',
  settings JSONB NOT NULL DEFAULT '{"autoLockMinutes": 10}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vault_data_user_id ON vault_data(user_id);
CREATE UNIQUE INDEX idx_vault_data_user_id_unique ON vault_data(user_id);

ALTER TABLE vault_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for own vault" ON vault_data
  FOR SELECT USING (user_id = 'default-user');

CREATE POLICY "Enable insert for own vault" ON vault_data
  FOR INSERT WITH CHECK (user_id = 'default-user');

CREATE POLICY "Enable update for own vault" ON vault_data
  FOR UPDATE USING (user_id = 'default-user');

CREATE TRIGGER update_vault_data_updated_at
  BEFORE UPDATE ON vault_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();