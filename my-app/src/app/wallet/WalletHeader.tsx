"use client";

import { Search, Lock, Menu, X, Upload } from "lucide-react";
import { WalletCategory } from "@/types/wallet";

interface WalletHeaderProps {
  onLock: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onAddDocumentClick: () => void;
  showMobileNav: boolean;
  onToggleMobileNav: () => void;
  activeCategory: WalletCategory | "OVERVIEW";
  recordCount: number;
}

export function WalletHeader({
  onLock,
  onSearchChange,
  searchQuery,
  onAddDocumentClick,
  showMobileNav,
  onToggleMobileNav,
  activeCategory,
  recordCount,
}: WalletHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border-primary px-6 py-3">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label={showMobileNav ? "Close menu" : "Open menu"}
          >
            {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <h1 className="text-[1.2rem] font-extrabold text-text-primary" style={{ fontFamily: "var(--font-merriweather)" }}>
              Personal Wallet
            </h1>
            <p className="text-text-secondary text-[0.8rem] hidden sm:block">A private space for my personal information and important documents.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search records…"
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg bg-background text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:ml-auto">
          <button
            onClick={onLock}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-[#f2f0e5]"
            aria-label="Lock wallet"
          >
            <Lock className="w-5 h-5" />
          </button>

          <button
            onClick={onAddDocumentClick}
            className="hidden sm:flex items-center gap-2 px-3 py-2 border border-border-primary rounded-lg text-text-primary hover:bg-[#f2f0e5] transition-colors text-sm font-medium"
            aria-label="Add document"
          >
            <Upload className="w-4 h-4" />
            Add Document
          </button>

          <button
            onClick={onAddDocumentClick}
            className="sm:hidden p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-[#f2f0e5]"
            aria-label="Add document"
          >
            <Upload className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}