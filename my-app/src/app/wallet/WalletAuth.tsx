"use client";

import { useState } from "react";
import { Lock, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import SectionTag from "@/components/ui/section-tag";

interface WalletAuthProps {
  onAuthChange: (authenticated: boolean) => void;
}

export function WalletAuth({ onAuthChange }: WalletAuthProps) {
  const [passphrase, setPassphrase] = useState("");
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphrase.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/wallet/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onAuthChange(true);
      } else {
        setError(data.error || "Invalid passphrase");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[580px] mx-auto px-6 pt-10 pb-10">
      <div className="flex flex-col gap-5">
        <div>
          <SectionTag noMargin>wallet</SectionTag>
          <h1 className="text-[1.4rem] font-extrabold text-text-primary mt-2" style={{ fontFamily: "var(--font-merriweather)" }}>
            Personal Wallet
          </h1>
          <p className="text-text-secondary mt-1">A private space for my personal information and important documents.</p>
        </div>

        <div className="border border-border-primary rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#f2f0e5] text-text-primary">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-text-primary font-medium">Wallet Locked</p>
              <p className="text-text-secondary text-sm">Enter your passphrase to unlock</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <label htmlFor="passphrase" className="block text-text-primary text-sm mb-1.5">
                Passphrase
              </label>
              <div className="relative">
                <input
                  id="passphrase"
                  type={showPassphrase ? "text" : "password"}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full px-4 py-2.5 border border-border-primary rounded-lg bg-background text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                  placeholder="Enter your wallet passphrase"
                  autoComplete="off"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase(!showPassphrase)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
                >
                  {showPassphrase ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !passphrase.trim()}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Unlocking…
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Unlock Wallet
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-text-secondary text-[0.8rem]">
            Passphrase is stored securely in environment variables. Sessions expire after 30 minutes of inactivity.
          </p>
        </div>
      </div>
    </div>
  );
}