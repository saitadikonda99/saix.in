// Wallet Types - matches Supabase schema and form data structures

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

export interface WalletRecord {
  id: string;
  category: WalletCategory;
  title: string;
  data: Record<string, unknown>;
  fileLinks?: FileLink[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FileLink {
  name: string;
  url: string;
  type: string;
}

// Unified Personal Vault Data Structure (single record per user)
export interface VaultData {
  id: string;
  personal: PersonalVaultData;
  documents: DocumentVaultData[];
  settings: VaultSettings;
}

export interface PersonalVaultData {
  id?: string;
  // Personal
  fullName?: string;
  dob?: string;
  mobile?: string;
  altMobile?: string;
  email?: string;
  // Identity
  aadhaar?: string;
  pan?: string;
  voterId?: string;
  licence?: string;
  passport?: string;
  // Family
  fatherName?: string;
  motherName?: string;
  emergencyName?: string;
  emergencyNumber?: string;
  relationship?: string;
  // Address
  permanentAddress?: string;
  currentAddress?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  country?: string;
  // Banking
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  ifsc?: string;
  branchName?: string;
  branchAddress?: string;
  accountType?: string;
  upiId?: string;
  // Other
  other1?: string;
  other2?: string;
  other3?: string;
}

export interface DocumentVaultData {
  id: string;
  name: string;
  category: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface VaultSettings {
  pin?: string;
  autoLockMinutes: number;
  // Privacy & Data Protection
  encryptSensitiveFields?: boolean;
  maskByDefault?: boolean;
  dataRetentionDays?: number;
  allowExport?: boolean;
}

// Field groups for UI organization
export const FIELD_GROUPS: FieldGroup[] = [
  {
    title: "Personal",
    fields: [
      { key: "fullName", label: "Full Name" },
      { key: "dob", label: "Date of Birth" },
      { key: "mobile", label: "Mobile Number", sensitive: true },
      { key: "altMobile", label: "Alternate Mobile Number", sensitive: true },
      { key: "email", label: "Email Address", sensitive: true },
    ],
  },
  {
    title: "Identity",
    fields: [
      { key: "aadhaar", label: "Aadhaar Number", sensitive: true },
      { key: "pan", label: "PAN Number", sensitive: true },
      { key: "voterId", label: "Voter ID", sensitive: true },
      { key: "licence", label: "Driving Licence Number", sensitive: true },
      { key: "passport", label: "Passport Number", sensitive: true },
    ],
  },
  {
    title: "Family",
    fields: [
      { key: "fatherName", label: "Father's Name" },
      { key: "motherName", label: "Mother's Name" },
      { key: "emergencyName", label: "Emergency Contact Name" },
      { key: "emergencyNumber", label: "Emergency Contact Number", sensitive: true },
      { key: "relationship", label: "Relationship" },
    ],
  },
  {
    title: "Address",
    fields: [
      { key: "permanentAddress", label: "Permanent Address" },
      { key: "currentAddress", label: "Current Address" },
      { key: "town", label: "Village / Town" },
      { key: "district", label: "District" },
      { key: "state", label: "State" },
      { key: "pincode", label: "PIN Code" },
      { key: "country", label: "Country" },
    ],
  },
  {
    title: "Banking",
    fields: [
      { key: "bankName", label: "Bank Name" },
      { key: "accountHolder", label: "Account Holder Name" },
      { key: "accountNumber", label: "Account Number", sensitive: true },
      { key: "ifsc", label: "IFSC Code", sensitive: true },
      { key: "branchName", label: "Branch Name" },
      { key: "branchAddress", label: "Branch Address" },
      { key: "accountType", label: "Account Type (Savings / Current)" },
      { key: "upiId", label: "UPI ID", sensitive: true },
    ],
  },
  {
    title: "Other Important",
    fields: [
      { key: "other1", label: "Other Contact 1", sensitive: true },
      { key: "other2", label: "Other Contact 2", sensitive: true },
      { key: "other3", label: "Other Contact 3", sensitive: true },
    ],
  },
];

export interface FieldGroup {
  title: string;
  fields: FieldConfig[];
}

export interface FieldConfig {
  key: string;
  label: string;
  sensitive?: boolean;
}

// Sensitive fields that should be masked by default
export const SENSITIVE_FIELD_KEYS = new Set<string>([
  "mobile",
  "altMobile",
  "email",
  "aadhaar",
  "pan",
  "voterId",
  "licence",
  "passport",
  "emergencyNumber",
  "accountNumber",
  "ifsc",
  "upiId",
  "other1",
  "other2",
  "other3",
]);

// Document categories
export const DOCUMENT_CATEGORIES = [
  "Identity",
  "Banking",
  "Education",
  "Medical",
  "Insurance",
  "Property",
  "Vehicle",
  "Travel",
  "Other",
];

export const CATEGORY_ORDER: WalletCategory[] = [
  "PERSONAL_DETAILS",
  "CONTACT_INFORMATION",
  "INDIAN_IDENTITY_DOCUMENTS",
  "BANKING_FINANCE",
  "EDUCATION",
  "CAREER_EMPLOYMENT",
  "SOCIAL_LINKS",
  "DOCUMENTS_FILES",
  "OTHER_RECORDS",
];

export function maskValue(v: string): string {
  if (!v) return "";
  return v.length <= 4 ? "••••" : "•••• •••• " + String(v).slice(-4);
}