// Supabase Database Types for Wallet

export interface WalletRecordRow {
  id: string;
  user_id: string; // For future multi-user support
  category: WalletCategory;
  title: string;
  data: Record<string, unknown>;
  file_links: FileLink[] | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export type WalletCategory =
  | "PERSONAL_DETAILS"
  | "CONTACT_INFORMATION"
  | "INDIAN_IDENTITY_DOCUMENTS"
  | "BANKING_FINANCE"
  | "EDUCATION"
  | "CAREER_EMPLOYMENT"
  | "SOCIAL_LINKS"
  | "DOCUMENTS_FILES"
  | "OTHER_RECORDS";

export interface FileLink {
  name: string;
  url: string;
  type: string;
}

export interface WalletSessionRow {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  created_at: string;
}

// Type for inserting new records
export type WalletRecordInsert = Omit<WalletRecordRow, "id" | "created_at" | "updated_at">;

// Type for updating records
export type WalletRecordUpdate = Partial<WalletRecordInsert>;