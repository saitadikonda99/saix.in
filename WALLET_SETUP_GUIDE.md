# Wallet Setup Guide

This guide will help you fix all the issues and get the wallet working properly.

## Issues Fixed

1. ✅ **Supabase `vault_data` table not found** - Run the SQL migration
2. ✅ **Redis connection error** - Environment variables fixed
3. ✅ **Scroll main div not whole dashboard** - Fixed with proper overflow handling
4. ✅ **Upload document not working** - Fixed to use Supabase Storage + vault_data API
5. ✅ **Settings not working** - Fixed shadowed state variables and duplicate code
6. ✅ **Mobile responsive** - Fixed sidebar and content layout

## Step-by-Step Setup

### 1. Create Environment File

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `WALLET_PASSPHRASE` - Your wallet passphrase (min 8 characters)
- `WALLET_SESSION_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (public)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (SECRET!)

### 2. Run Supabase Database Migration

Go to your Supabase Dashboard → SQL Editor and run the contents of `supabase-schema.sql`.

This creates:
- `wallet_records` table
- `wallet_sessions` table
- `vault_data` table (for unified personal vault)
- Row Level Security policies
- Indexes and triggers

### 3. Create Supabase Storage Bucket

Go to your Supabase Dashboard → SQL Editor and run the contents of `supabase-storage-setup.sql`.

This creates:
- `wallet-documents` storage bucket (public, 50MB limit)
- Policies for upload/read/delete

**Alternative**: Create bucket manually in Supabase Dashboard → Storage → Create bucket:
- Name: `wallet-documents`
- Public: Yes
- File size limit: 50MB
- Allowed MIME types: PDF, DOC, DOCX, JPG, PNG, TXT, CSV, XLS, XLSX

### 4. Install Dependencies & Run

```bash
cd my-app
npm install
npm run dev
```

### 5. Access Wallet

Navigate to `http://localhost:3000/wallet` and enter your passphrase.

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── wallet/
│   │   │   ├── page.tsx          # Wallet page entry
│   │   │   ├── WalletClient.tsx  # Auth state management
│   │   │   ├── WalletContent.tsx # Main wallet UI (FIXED)
│   │   │   ├── WalletHeader.tsx  # Header with search
│   │   │   ├── WalletAuth.tsx    # Passphrase entry
│   │   │   ├── DocumentUploadModal.tsx # Upload modal (FIXED)
│   │   │   └── ConfirmDialog.tsx
│   │   └── api/wallet/
│   │       ├── vault/route.ts    # Vault API (FIXED - handles documents)
│   │       ├── records/route.ts  # Records API (Prisma)
│   │       ├── session/route.ts  # Session check
│   │       ├── lock/route.ts     # Lock wallet
│   │       └── unlock/route.ts   # Unlock wallet
│   ├── lib/
│   │   ├── supabase.ts           # Supabase clients
│   │   ├── auth.ts               # JWT session management
│   │   └── prisma.ts             # Prisma client
│   └── types/wallet.ts           # TypeScript types
├── supabase-schema.sql           # Database migration
├── supabase-storage-setup.sql    # Storage bucket setup
└── .env.local.example            # Environment template
```

## Key Fixes Made

### WalletContent.tsx
- Removed massive code duplication (was 1200+ lines, now ~670)
- Fixed SettingsSection to use props instead of shadowed state
- Added proper body scroll prevention
- Clean separation of Personal, Documents, Settings sections

### DocumentUploadModal.tsx
- Now uploads to Supabase Storage bucket `wallet-documents`
- Saves document metadata to `vault_data.documents` array via API
- Proper error handling and success states

### Vault API (route.ts)
- GET: Fetches full vault data
- POST: Handles both full vault upsert AND single document addition
- Proper error handling for PGRST116 (no rows)

### Scrolling
- Main content area: `overflow-y-auto` with `min-w-0`
- Body gets `wallet-open` class to prevent background scroll
- Mobile sidebar drawer fixed positioning

## Testing Checklist

- [ ] Wallet unlocks with passphrase
- [ ] Personal tab: view/edit personal info
- [ ] Documents tab: upload PDF/image → appears in list
- [ ] Documents tab: click to open, copy URL, delete
- [ ] Settings tab: set 4-digit PIN
- [ ] Settings tab: change auto-lock time
- [ ] Settings tab: export vault data
- [ ] Settings tab: wipe all data (with confirmation)
- [ ] Mobile: sidebar opens/closes, tabs work
- [ ] Lock button works
- [ ] Page refresh preserves data (Supabase + localStorage)

## Troubleshooting

### "Could not find table 'public.vault_data'"
→ Run `supabase-schema.sql` in Supabase SQL Editor

### "getaddrinfo ENOTFOUND your-redis-url.upstash.io"
→ Either configure Upstash Redis in `.env.local` or ignore (visitor analytics uses in-memory fallback)

### Upload fails with "Failed to save document"
→ Check Supabase Storage bucket exists and policies allow authenticated uploads

### Settings PIN not saving
→ Check browser console for errors, verify `/api/wallet/vault` POST works

### Mobile sidebar not working
→ Ensure viewport meta tag in layout (Next.js handles this automatically)

## Development Notes

- Uses Supabase for database (PostgreSQL) + Storage
- Uses Prisma for `wallet_records` (legacy, can be removed)
- Uses JWT in HttpOnly cookies for sessions
- LocalStorage as fallback for offline support
- All sensitive fields masked by default (eye toggle to reveal)