"use client";

import { useState } from "react";
import { X, Upload, Loader2, FileText, AlertCircle, Check } from "lucide-react";
import { DOCUMENT_CATEGORIES } from "@/types/wallet";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function DocumentUploadModal({ isOpen, onClose, onUploadComplete }: DocumentUploadModalProps) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("Identity");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!fileName) {
        setFileName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setFileName("");
    setDescription("");
    setCategory("Identity");
    setError("");
  };

  const handleClose = () => {
    if (uploading) return;
    reset();
    setSuccess(false);
    onClose();
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileName.trim()) {
      setError("Please select a file and enter a name");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", fileName.trim());
      formData.append("category", category);
      formData.append("description", description.trim());

      const res = await fetch("/api/wallet/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to upload document");
      }

      setSuccess(true);

      setTimeout(() => {
        onUploadComplete();
        reset();
        setSuccess(false);
        onClose();
      }, 900);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={handleClose}>
      <div className="bg-background border border-border-primary rounded-xl w-full max-w-md max-h-[90dvh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-primary shrink-0">
          <div>
            <h2 className="text-[1.2rem] font-extrabold text-text-primary" style={{ fontFamily: "var(--font-merriweather)" }}>
              Upload Document
            </h2>
            <p className="text-text-secondary text-sm mt-0.5">Add a file to your documents</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-[#f2f0e5] rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-text-primary font-medium text-lg">Document Uploaded</h3>
              <p className="text-text-secondary mt-1">{fileName} has been saved</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpload();
              }}
              className="space-y-4"
            >
              {/* File Selection */}
              <div>
                <label className="block text-text-primary text-sm mb-2">Select File</label>
                <div className="relative">
                  <input
                    type="file"
                    id="document-file"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.csv,.xls,.xlsx"
                  />
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      selectedFile ? "border-orange bg-orange/5" : "border-border-primary hover:border-orange hover:bg-[#f2f0e5]"
                    }`}
                  >
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-10 h-10 text-orange" />
                        <div className="text-left">
                          <p className="text-text-primary font-medium break-all">{selectedFile.name}</p>
                          <p className="text-text-secondary text-sm">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-10 h-10 mx-auto text-text-secondary mb-2" />
                        <p className="text-text-primary">Click to select or drag & drop</p>
                        <p className="text-text-secondary text-sm mt-1">PDF, DOC, JPG, PNG, XLS, CSV, TXT</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Document Name */}
              <div>
                <label htmlFor="doc-name" className="block text-text-primary text-sm mb-1.5">Document Name *</label>
                <input
                  id="doc-name"
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g., Aadhaar Card, Insurance Policy"
                  className="w-full px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                  disabled={uploading}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="doc-category" className="block text-text-primary text-sm mb-1.5">Category</label>
                <select
                  id="doc-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                  disabled={uploading}
                >
                  {DOCUMENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="doc-description" className="block text-text-primary text-sm mb-1.5">Description (optional)</label>
                <textarea
                  id="doc-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this document"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                  disabled={uploading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded bg-red-50 border border-red-200 text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Upload Button */}
              <button
                type="submit"
                disabled={uploading || !selectedFile || !fileName.trim()}
                className="btn btn-accent w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
