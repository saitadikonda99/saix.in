"use client";

import { FileText, Edit, Trash2, Eye, ExternalLink, Copy, MoreHorizontal, Download } from "lucide-react";
import { WalletRecord } from "@/types/wallet";

interface WalletRecordCardProps {
  record: WalletRecord;
  onView?: (record: WalletRecord) => void;
  onEdit?: (record: WalletRecord) => void;
  onDelete?: (record: WalletRecord) => void;
}

export function WalletRecordCard({ record, onView, onEdit, onDelete }: WalletRecordCardProps) {
  const hasFiles = (record.fileLinks?.length || 0) > 0;

  return (
    <div className="bg-background border border-border-primary rounded-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-text-primary font-medium truncate">{record.title}</h3>
            {hasFiles && (
              <span className="px-1.5 py-0.5 bg-[#f2f0e5] dark:bg-[#2a2a2a] rounded text-[0.7rem] text-text-secondary">
                {record.fileLinks?.length} file(s)
              </span>
            )}
          </div>
          <p className="text-text-secondary text-sm truncate">
            {formatRecordPreview(record)}
          </p>
          {record.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {record.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-[#f2f0e5] dark:bg-[#2a2a2a] rounded text-[0.7rem] text-text-secondary">
                  {tag}
                </span>
              ))}
              {record.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-[#f2f0e5] dark:bg-[#2a2a2a] rounded text-[0.7rem] text-text-secondary">
                  +{record.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onView?.(record)}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-[#f2f0e5] dark:hover:bg-[#2a2a2a] rounded transition-colors"
            aria-label="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit?.(record)}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-[#f2f0e5] dark:hover:bg-[#2a2a2a] rounded transition-colors"
            aria-label="Edit record"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(record)}
            className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
            aria-label="Delete record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border-primary flex items-center justify-between">
        <span className="text-[0.75rem] text-text-secondary">
          Updated {new Date(record.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        {hasFiles && (
          <button className="text-text-secondary hover:text-text-primary text-[0.8rem] font-medium flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            View Files
          </button>
        )}
      </div>
    </div>
  );
}

function formatRecordPreview(record: WalletRecord): string {
  const data = record.data as Record<string, unknown>;
  
  switch (record.category) {
    case "PERSONAL_DETAILS":
      return data.fullLegalName ? `Name: ${data.fullLegalName}` : "Personal details";
    case "CONTACT_INFORMATION":
      return data.primaryPhone ? `Phone: ${data.primaryPhone}` : "Contact information";
    case "INDIAN_IDENTITY_DOCUMENTS":
      return data.displayName ? `${data.displayName} (${data.maskedIdentifier || "masked"})` : "Identity document";
    case "BANKING_FINANCE":
      return data.bankName ? `${data.bankName} · ${data.maskedAccountNumber || "****"}` : "Bank account";
    case "EDUCATION":
      return data.institution ? `${data.institution} · ${data.qualification || ""}` : "Education record";
    case "CAREER_EMPLOYMENT":
      return Array.isArray(data.workExperience) && data.workExperience.length > 0 ? `${data.workExperience.length} experience entries` : "Career record";
    case "SOCIAL_LINKS":
      return data.platform ? `${data.platform}: ${data.url}` : "Social link";
    case "DOCUMENTS_FILES":
      return data.fileName ? `Document: ${data.fileName}` : "Document";
    case "OTHER_RECORDS":
      return data.recordType ? `${data.recordType}: ${data.title || ""}` : "Other record";
    default:
      return "Record";
  }
}