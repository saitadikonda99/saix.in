"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Copy, Check, ExternalLink, FileText, Loader2, AlertCircle, Eye } from "lucide-react";
import { DocumentVaultData } from "@/types/wallet";

type PreviewKind = "image" | "pdf" | "text" | "none";

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif"];
const TEXT_EXTENSIONS = ["txt", "csv", "json", "md", "log"];

function getPreviewKind(doc: DocumentVaultData): PreviewKind {
  const ext = (doc.type || doc.name.split(".").pop() || "").toLowerCase();
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (TEXT_EXTENSIONS.includes(ext)) return "text";
  return "none";
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentViewModal({
  doc,
  onClose,
}: {
  doc: DocumentVaultData | null;
  onClose: () => void;
}) {
  const kind = useMemo(() => (doc ? getPreviewKind(doc) : null), [doc]);
  const [loading, setLoading] = useState(true);
  const [textContent, setTextContent] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Reset state whenever a new document is opened
  useEffect(() => {
    setLoading(true);
    setError("");
    setTextContent("");
    setCopied(false);
  }, [doc]);

  // Close on Escape
  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc, onClose]);

  // Fetch text previews
  useEffect(() => {
    if (!doc || kind !== "text") return;
    let cancelled = false;
    fetch(doc.url)
      .then((r) => {
        if (!r.ok) throw new Error("Could not load file");
        return r.text();
      })
      .then((text) => {
        if (!cancelled) {
          setTextContent(text.slice(0, 200_000));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Preview could not be loaded. Open the file in a new tab instead.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [doc, kind]);

  const handleCopyLink = async () => {
    if (!doc) return;
    try {
      await navigator.clipboard.writeText(doc.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — ignore
    }
  };

  if (!doc || !kind) return null;

  const sizeLabel = formatBytes(doc.size);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border-primary rounded-xl w-full max-w-3xl max-h-[92dvh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-4 border-b border-border-primary shrink-0">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8ba2ff]">
              <Eye className="w-3.5 h-3.5" />
              Document Preview
            </p>
            <h2 className="text-[1.05rem] font-extrabold text-text-primary truncate" style={{ fontFamily: "var(--font-merriweather)" }}>
              {doc.name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-text-secondary text-[0.72rem]">
              <span className="px-2 py-0.5 bg-[#f2f0e5] rounded-full">{doc.category}</span>
              <span className="px-2 py-0.5 bg-[#f2f0e5] rounded-full uppercase">{doc.type}</span>
              {sizeLabel && <span>{sizeLabel}</span>}
              <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-[#f2f0e5] rounded-lg transition-colors shrink-0"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview body */}
        <div className="flex-1 min-h-[45dvh] overflow-auto bg-[#faf9f4] relative">
          {error ? (
            <div className="flex flex-col items-center justify-center text-center px-6 py-16 text-text-secondary">
              <AlertCircle className="w-10 h-10 mb-3 text-[#ef4444]" />
              <p className="text-text-primary font-medium mb-1">Preview unavailable</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : kind === "image" ? (
            <>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-text-secondary" />
                </div>
              )}
              <div className="flex items-center justify-center p-3 sm:p-5 min-h-[45dvh]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.url}
                  alt={doc.name}
                  className="max-w-full max-h-[65dvh] object-contain rounded-lg border border-border-primary bg-white"
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setError("Image could not be loaded. The secure link may have expired — reload the page to refresh it.");
                  }}
                />
              </div>
            </>
          ) : kind === "pdf" ? (
            <>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Loader2 className="w-6 h-6 animate-spin text-text-secondary" />
                </div>
              )}
              <iframe
                src={doc.url}
                title={doc.name}
                className="w-full h-[65dvh]"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError("PDF could not be loaded. The secure link may have expired — reload the page to refresh it.");
                }}
              />
            </>
          ) : kind === "text" ? (
            loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-text-secondary" />
              </div>
            ) : (
              <pre className="p-4 text-[0.75rem] leading-relaxed whitespace-pre-wrap break-words text-text-primary">
                {textContent || "(empty file)"}
              </pre>
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-center px-6 py-16">
              <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#f2f0e5] mb-4">
                <FileText className="w-7 h-7 text-text-secondary" />
              </span>
              <p className="text-text-primary font-medium mb-1">In-browser preview not available</p>
              <p className="text-text-secondary text-sm mb-1">
                .{doc.type?.toUpperCase() || "FILE"} files can&apos;t be shown here.
              </p>
              <p className="text-text-secondary text-sm">Open the file in a new tab to view it.</p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 p-3 sm:p-4 border-t border-border-primary shrink-0">
          <button className="btn btn-ghost btn-sm" onClick={handleCopyLink}>
            {copied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy link"}
          </button>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  );
}
