"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Menu, X, Upload, Settings, Download, Copy, Eye, EyeOff, Trash2, Check, User, FileText, Key, Shield, Pencil } from "lucide-react";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { FIELD_GROUPS, PersonalVaultData, DocumentVaultData, VaultData, VaultSettings } from "@/types/wallet";

function getDefaultPersonal(): PersonalVaultData {
  return { country: "India", accountType: "Savings" };
}

function getDefaultSettings(): VaultSettings {
  return { 
    autoLockMinutes: 10,
    encryptSensitiveFields: true,
    maskByDefault: true,
    dataRetentionDays: 365,
    allowExport: true,
  };
}

function getEmptyVaultData(): VaultData {
  return { id: crypto.randomUUID(), personal: getDefaultPersonal(), documents: [], settings: getDefaultSettings() };
}

function maskValue(v: string): string {
  if (!v) return "";
  return v.length <= 4 ? "••••" : "•••• •••• " + String(v).slice(-4);
}

const tabs = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

// --- Sub-components ---

function Sidebar({ tabs, activeTab, onTabChange, onLock, userName }: { tabs: any[]; activeTab: "personal" | "documents" | "settings"; onTabChange: (tab: "personal" | "documents" | "settings") => void; onLock: () => void; userName: string }) {
  return (
    <div className="flex flex-col h-full p-5">
      <div className="mb-6 border-b border-border-primary pb-4">
        <h4 className="font-extrabold text-text-primary truncate" style={{ fontFamily: "var(--font-merriweather)" }}>
          {userName.toUpperCase()}
        </h4>
        <span className="text-[0.7rem] text-text-secondary uppercase tracking-[0.14em]">Private vault</span>
      </div>
      <nav className="flex flex-col gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.8rem] font-medium tracking-wide transition-colors w-full text-left ${
              activeTab === tab.id
                ? "bg-[#f2f0e5] text-text-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-[#f2f0e5]"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{tab.label.toUpperCase()}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-border-primary">
        <button onClick={onLock} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.8rem] font-medium tracking-wide text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors w-full">
          <Lock className="w-4 h-4 shrink-0" />
          LOCK VAULT
        </button>
      </div>
    </div>
  );
}

function MobileSidebar({ tabs, activeTab, onTabChange, onLock }: { tabs: any[]; activeTab: "personal" | "documents" | "settings"; onTabChange: (tab: "personal" | "documents" | "settings") => void; onLock: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 border-b border-border-primary pb-4">
        <h4 className="font-extrabold text-text-primary" style={{ fontFamily: "var(--font-merriweather)" }}>VAULT</h4>
        <span className="text-[0.7rem] text-text-secondary uppercase tracking-[0.14em]">Private vault</span>
      </div>
      <nav className="flex flex-col gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { onTabChange(tab.id); }}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[0.8rem] font-medium tracking-wide transition-colors w-full text-left ${
              activeTab === tab.id
                ? "bg-[#f2f0e5] text-text-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-[#f2f0e5]"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{tab.label.toUpperCase()}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-border-primary">
        <button onClick={onLock} className="flex items-center gap-3 px-3 py-3 rounded-lg text-[0.8rem] font-medium tracking-wide text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors w-full">
          <Lock className="w-4 h-4 shrink-0" />
          LOCK VAULT
        </button>
      </div>
    </div>
  );
}

function PersonalSection({
  data,
  formData,
  editing,
  revealed,
  saved,
  busy,
  onEditClick,
  onSave,
  onCancel,
  onRevealToggle,
  onDeleteAll,
  onCopyAll,
  onRevealChange,
  onFormChange,
}: {
  data: PersonalVaultData | null;
  formData: PersonalVaultData;
  editing: boolean;
  revealed: boolean;
  saved: boolean;
  busy: boolean;
  onEditClick: () => void;
  onSave: () => void;
  onCancel: () => void;
  onRevealToggle: () => void;
  onDeleteAll: () => void;
  onCopyAll: () => void;
  onRevealChange: (val: boolean) => void;
  onFormChange: (key: string, value: string) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <p className="kicker">PRIVATE ARCHIVE</p>
        <h1 className="text-[1.5rem] sm:text-[1.8rem] font-extrabold text-text-primary leading-tight" style={{ fontFamily: "var(--font-merriweather)" }}>
          My Personal Vault
        </h1>
        <p className="text-text-secondary mt-1 text-[0.85rem]">Personal Information · Stored in Supabase · Auto-locks when idle</p>
      </div>

      <div className="record-form">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-border-primary">
          <h4 className="m-0">Personal Details</h4>
          <div className="flex items-center gap-1.5">
            <button className="icon-btn" title={revealed ? "Hide sensitive values" : "Show sensitive values"} onClick={onRevealToggle}>
              {revealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button className="icon-btn" title="Copy all" onClick={onCopyAll}>
              <Copy className="w-5 h-5" />
            </button>
            {!editing && (
              <button className="icon-btn" title="Edit" onClick={onEditClick}>
                <Pencil className="w-5 h-5" />
              </button>
            )}
            {!editing && (
              <button className="icon-btn" title="Delete all" style={{ color: "#ff9aa8" }} onClick={onDeleteAll}>
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {FIELD_GROUPS.map(group => (
          <div key={group.title} className="mt-6 first:mt-0">
            <h5 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8ba2ff] mb-2">
              {group.title}
            </h5>
            <div className="rounded-lg border border-border-primary/70 divide-y divide-border-primary/40 overflow-hidden">
              {group.fields.map(field => (
                <div key={field.key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-3 sm:px-4 py-2.5">
                  <span className="text-text-secondary text-[0.78rem] sm:text-[0.85rem] sm:w-[190px] sm:shrink-0">{field.label}</span>
                  {editing ? (
                    <input
                      value={formData[field.key as keyof PersonalVaultData] as string || ""}
                      onChange={e => onFormChange(field.key, e.target.value)}
                      className="w-full sm:max-w-[340px] flex-1 px-3 py-2 border border-border-primary rounded-md bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
                      type={field.key === "dob" ? "date" : "text"}
                    />
                  ) : (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="flex-1 break-words text-[0.85rem]" style={{ color: formData[field.key as keyof PersonalVaultData] ? "var(--text-primary)" : "var(--text-secondary)" }}>
                        {field.sensitive && !revealed
                          ? maskValue(formData[field.key as keyof PersonalVaultData] as string || "")
                          : (formData[field.key as keyof PersonalVaultData] as string || "—")}
                      </span>
                      {formData[field.key as keyof PersonalVaultData] && (
                        <button className="icon-btn" title="Copy" onClick={() => navigator.clipboard.writeText(formData[field.key as keyof PersonalVaultData] as string).catch(() => {})}>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {editing && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={onSave} disabled={busy}>Save Changes</button>
            <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          </div>
        )}

        {saved && (
          <div className="mt-4 flex items-center gap-2 text-[#22c55e] text-sm">
            <Check className="w-4 h-4" /> Saved to Supabase
          </div>
        )}

        <p className="mt-5 text-[0.75rem] text-text-secondary">
          Values you leave blank stay empty. Details are stored in your Supabase vault.
        </p>
      </div>
    </div>
  );
}

function DocumentsSection({
  documents,
  onAddDocumentClick,
  onDeleteDocument,
  onCopyUrl,
}: {
  documents: DocumentVaultData[];
  onAddDocumentClick: () => void;
  onDeleteDocument: (id: string) => void;
  onCopyUrl: (url: string) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="kicker">PRIVATE ARCHIVE</p>
          <h1 className="text-[1.5rem] sm:text-[1.8rem] font-extrabold text-text-primary leading-tight" style={{ fontFamily: "var(--font-merriweather)" }}>
            Documents
          </h1>
          <p className="text-text-secondary mt-1 text-[0.85rem]">Upload and manage your private documents</p>
        </div>
        <button className="btn btn-primary shrink-0 self-start sm:self-auto" onClick={onAddDocumentClick}>
          <Upload className="w-4 h-4" />
          Add Document
        </button>
      </div>

      {/* Documents List */}
      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-14 px-6 text-text-secondary border border-dashed border-border-primary rounded-xl bg-[#faf9f4]">
          <FileText className="w-14 h-14 mb-4 opacity-40" />
          <p className="text-text-primary font-medium mb-1">No documents yet</p>
          <p className="text-sm mb-5">Upload your first document to keep it safe here</p>
          <button className="btn btn-accent" onClick={onAddDocumentClick}>
            <Upload className="w-4 h-4" />
            Add Document
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.id} className="bg-background border border-border-primary rounded-xl p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#f2f0e5] shrink-0">
                  <FileText className="w-5 h-5 text-text-secondary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-text-primary font-medium truncate">{doc.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-text-secondary text-[0.75rem]">
                    <span className="px-2 py-0.5 bg-[#f2f0e5] rounded-full">{doc.category}</span>
                    <span className="px-2 py-0.5 bg-[#f2f0e5] rounded-full uppercase">{doc.type}</span>
                    <span className="whitespace-nowrap">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t border-border-primary/50 pt-2.5 sm:border-0 sm:pt-0 w-full sm:w-auto justify-end">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Open document">
                  <Download className="w-4 h-4" />
                </a>
                <button className="icon-btn" title="Copy URL" onClick={() => onCopyUrl(doc.url)}>
                  <Copy className="w-4 h-4" />
                </button>
                <button className="icon-btn" style={{ color: "#ef4444" }} title="Delete document" onClick={() => onDeleteDocument(doc.id)}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsSection({
  data,
  settings,
  busy,
  onPinSave,
  onAutoLockChange,
  onExport,
  onWipe,
  onSave,
}: {
  data: VaultData;
  settings: VaultSettings;
  busy: boolean;
  onPinSave: () => void;
  onAutoLockChange: (minutes: number) => void;
  onExport: () => void;
  onWipe: () => void;
  onSave: (data: VaultData) => Promise<void>;
}) {
  const [pin, setPin] = useState("");
  const [busyPin, setBusyPin] = useState(false);

  const handlePinSave = async () => {
    if (!pin || pin.length !== 4) return;
    setBusyPin(true);
    await onPinSave();
    setBusyPin(false);
  };

  const handleAutoLockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onAutoLockChange(parseInt(e.target.value));
  };

  const handlePrivacyChange = (key: string, value: boolean | number) => {
    onSave({ ...data, settings: { ...data.settings, [key]: value } });
  };

  // Consistent fallbacks so checkbox, select and button never disagree
  const maskByDefault = settings.maskByDefault ?? true;
  const encryptSensitive = settings.encryptSensitiveFields ?? true;
  const allowExport = settings.allowExport ?? true;
  const retentionDays = settings.dataRetentionDays ?? 365;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <p className="kicker">PRIVATE ARCHIVE</p>
        <h1 className="text-[1.5rem] sm:text-[1.8rem] font-extrabold text-text-primary leading-tight" style={{ fontFamily: "var(--font-merriweather)" }}>
          Settings
        </h1>
        <p className="text-text-secondary mt-1 text-[0.85rem]">Security, privacy and backup preferences</p>
      </div>

      <div className="space-y-5">
        {/* Access PIN */}
        <div className="record-form">
          <h4>Access PIN</h4>
          <p className="text-text-secondary text-[0.83rem] mt-1 mb-4">
            Your vault opens with a 4-digit PIN. The PIN is a local screen lock only — it does not
            encrypt your data or restrict access on the server.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="4-digit PIN"
              maxLength={4}
              className="px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm w-32 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
            />
            <button className="btn btn-primary" onClick={handlePinSave} disabled={busy || busyPin || pin.length !== 4}>
              <Key className="w-4 h-4" />
              {busyPin ? "Saving…" : "Set PIN"}
            </button>
          </div>
        </div>

        {/* Auto-lock */}
        <div className="record-form">
          <h4>Auto-lock</h4>
          <p className="text-text-secondary text-[0.83rem] mt-1 mb-4">
            Automatically lock the vault after inactivity.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Shield className="w-4 h-4 text-text-secondary" />
            <select
              value={settings.autoLockMinutes}
              onChange={handleAutoLockChange}
              className="px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm w-44 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>
        </div>

        {/* Privacy & Data Protection */}
        <div className="record-form">
          <h4>Privacy & Data Protection</h4>
          <p className="text-text-secondary text-[0.83rem] mt-1 mb-4">
            Control how your sensitive data is protected and displayed.
          </p>
          <div className="divide-y divide-border-primary/50">
            <label className="flex items-center justify-between gap-4 py-3 first:pt-0 cursor-pointer">
              <div className="min-w-0">
                <p className="text-text-primary font-medium">Mask sensitive fields by default</p>
                <p className="text-text-secondary text-[0.8rem]">Hide Aadhaar, PAN, bank details etc. until revealed</p>
              </div>
              <input
                type="checkbox"
                checked={maskByDefault}
                onChange={e => handlePrivacyChange('maskByDefault', e.target.checked)}
                className="w-5 h-5 shrink-0 accent-orange"
              />
            </label>
            <label className="flex items-center justify-between gap-4 py-3 cursor-pointer">
              <div className="min-w-0">
                <p className="text-text-primary font-medium">Encrypt sensitive fields</p>
                <p className="text-text-secondary text-[0.8rem]">Extra protection for highly sensitive identifiers</p>
              </div>
              <input
                type="checkbox"
                checked={encryptSensitive}
                onChange={e => handlePrivacyChange('encryptSensitiveFields', e.target.checked)}
                className="w-5 h-5 shrink-0 accent-orange"
              />
            </label>
            <label className="flex items-center justify-between gap-4 py-3 cursor-pointer">
              <div className="min-w-0">
                <p className="text-text-primary font-medium">Allow data export</p>
                <p className="text-text-secondary text-[0.8rem]">Enable JSON export of vault data</p>
              </div>
              <input
                type="checkbox"
                checked={allowExport}
                onChange={e => handlePrivacyChange('allowExport', e.target.checked)}
                className="w-5 h-5 shrink-0 accent-orange"
              />
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 last:pb-0">
              <div className="min-w-0">
                <p className="text-text-primary font-medium">Data retention</p>
                <p className="text-text-secondary text-[0.8rem]">Auto-delete documents older than this period</p>
              </div>
              <select
                value={retentionDays}
                onChange={e => handlePrivacyChange('dataRetentionDays', parseInt(e.target.value))}
                className="px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm w-full sm:w-44 shrink-0 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
              >
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={180}>180 days</option>
                <option value={365}>1 year</option>
                <option value={730}>2 years</option>
                <option value={0}>Forever</option>
              </select>
            </div>
          </div>
        </div>

        {/* Backup & Export */}
        <div className="record-form">
          <h4>Backup & Export</h4>
          <p className="text-text-secondary text-[0.83rem] mt-1 mb-4">
            Export your vault data as JSON for backup.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="btn btn-ghost"
              onClick={allowExport ? onExport : undefined}
              disabled={!allowExport}
            >
              <Download className="w-4 h-4" />
              Export Vault Data (JSON)
            </button>
            {!allowExport && (
              <span className="text-text-secondary text-[0.8rem]">Export disabled in privacy settings</span>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="record-form" style={{ borderColor: "rgba(255,138,154,0.5)" }}>
          <h4 className="!text-[#ef4444]">Danger Zone</h4>
          <p className="text-text-secondary text-[0.83rem] mt-1 mb-4">
            This permanently deletes your personal details and all documents from Supabase.
          </p>
          <button className="btn btn-ghost" style={{ borderColor: "rgba(255,138,154,0.5)", color: "#ef4444" }} onClick={onWipe}>
            <Trash2 className="w-4 h-4" />
            Delete All Vault Data
          </button>
        </div>
      </div>
    </div>
  );
}

export function WalletContent({ onLock }: { onLock: () => void }) {
  const [data, setData] = useState<VaultData>(getEmptyVaultData());
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"personal" | "documents" | "settings">("personal");
  const [editing, setEditing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [formData, setFormData] = useState<PersonalVaultData>(getDefaultPersonal());
  const [busy, setBusy] = useState(false);
  const [pin, setPin] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Prevent body scroll when wallet is open
  useEffect(() => {
    document.body.classList.add("wallet-open");
    return () => {
      document.body.classList.remove("wallet-open");
    };
  }, []);

  const mergeVault = (vaultData: Partial<VaultData>): VaultData => ({
    id: vaultData.id || crypto.randomUUID(),
    personal: vaultData.personal || {},
    documents: Array.isArray(vaultData.documents) ? vaultData.documents : [],
    settings: { ...getDefaultSettings(), ...(vaultData.settings || {}) },
  });

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet/vault", { credentials: "include" });
      if (res.ok) {
        const vaultData = await res.json();
        setData(mergeVault(vaultData));
      } else {
        const stored = localStorage.getItem("vault_data");
        if (stored) setData(mergeVault(JSON.parse(stored)));
      }
    } catch {
      const stored = localStorage.getItem("vault_data");
      if (stored) setData(mergeVault(JSON.parse(stored)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveData = async (newData: VaultData) => {
    setBusy(true);
    try {
      const res = await fetch("/api/wallet/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
        credentials: "include",
      });
      if (res.ok) {
        setData(newData);
        localStorage.setItem("vault_data", JSON.stringify(newData));
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setBusy(false);
    }
  };

  const handleFormChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const updated = { ...data, personal: { ...formData } };
    await saveData(updated);
    setEditing(false);
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Delete ALL personal information? This cannot be undone.")) {
      const newData = { ...data, personal: getDefaultPersonal() };
      await saveData(newData);
      setFormData(getDefaultPersonal());
      setEditing(true);
    }
  };

  const copyAll = () => {
    const text = FIELD_GROUPS.flatMap(g => g.fields.map(f => `${f.label}: ${formData[f.key as keyof PersonalVaultData] || ""}`)).join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const deleteDocument = async (docId: string) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/wallet/vault?documentId=${docId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        const vaultData = await res.json();
        setData(vaultData);
        localStorage.setItem("vault_data", JSON.stringify(vaultData));
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    } finally {
      setBusy(false);
    }
  };

  const copyDocumentUrl = (url: string) => {
    navigator.clipboard.writeText(url).catch(() => {});
  };

  const handlePinSave = async () => {
    if (!pin || pin.length !== 4) return;
    setBusy(true);
    const newData = { ...data, settings: { ...data.settings, pin } };
    await saveData(newData);
    setBusy(false);
    setPin("");
  };

  const handleAutoLockChange = (minutes: number) => {
    const newSettings = { ...data.settings, autoLockMinutes: minutes };
    saveData({ ...data, settings: newSettings });
  };

  const handleExport = () => {
    const exportData = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(exportData).catch(() => {});
    alert("Vault data copied to clipboard!");
  };

  const handleWipe = async () => {
    if (window.confirm("Delete ALL vault data? This cannot be undone.")) {
      const newData = getEmptyVaultData();
      await saveData(newData);
    }
  };

  useEffect(() => {
    if (!editing && data.personal) {
      setFormData(data.personal);
    }
  }, [data.personal, editing]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-secondary text-[0.875rem]">Loading vault…</div>
      </div>
    );
  }

  const handleLock = async () => {
    await fetch("/api/wallet/lock", { method: "POST", credentials: "include" });
    onLock();
  };

  return (
    <div className="h-dvh w-full bg-background flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <header className="shrink-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border-primary px-4 sm:px-6 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="p-2 text-text-secondary hover:text-text-primary"
              aria-label={showMobileNav ? "Close menu" : "Open menu"}
            >
              {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-[1.2rem] font-extrabold text-text-primary" style={{ fontFamily: "var(--font-merriweather)" }}>
                Personal Vault
              </h1>
            </div>
          </div>
          <button onClick={handleLock} className="p-2 text-text-secondary hover:text-text-primary" aria-label="Lock vault">
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* Mobile Sidebar Drawer */}
        {showMobileNav && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileNav(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-background border-r border-border-primary p-5 overflow-y-auto shadow-xl">
              <MobileSidebar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setShowMobileNav(false);
                }}
                onLock={handleLock}
              />
            </aside>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border-primary bg-[#faf9f4] overflow-y-auto">
          <Sidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} onLock={handleLock} userName={data.personal?.fullName || "User"} />
        </aside>

        {/* Main Content - only this scrolls */}
        <main className="flex-1 min-w-0 overflow-y-auto overscroll-contain px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          {activeTab === "personal" ? (
            <PersonalSection
              data={data.personal}
              formData={formData}
              editing={editing}
              revealed={revealed}
              saved={saved}
              busy={busy}
              onEditClick={() => { setFormData(data.personal || getDefaultPersonal()); setEditing(true); }}
              onSave={handleSave}
              onCancel={() => { setFormData(data.personal || getDefaultPersonal()); setEditing(false); }}
              onRevealToggle={() => setRevealed(!revealed)}
              onDeleteAll={handleDeleteAll}
              onCopyAll={copyAll}
              onRevealChange={setRevealed}
              onFormChange={handleFormChange}
            />
          ) : activeTab === "documents" ? (
            <DocumentsSection
              documents={data.documents}
              onAddDocumentClick={() => setShowUploadModal(true)}
              onDeleteDocument={deleteDocument}
              onCopyUrl={copyDocumentUrl}
            />
          ) : (
            <SettingsSection
              data={data}
              settings={data.settings}
              busy={busy}
              onPinSave={handlePinSave}
              onAutoLockChange={handleAutoLockChange}
              onExport={handleExport}
              onWipe={handleWipe}
              onSave={saveData}
            />
          )}
        </main>
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={loadData}
      />
    </div>
  );
}