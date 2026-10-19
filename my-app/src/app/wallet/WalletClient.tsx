"use client";

import { useState, useEffect } from "react";
import { WalletContent } from "./WalletContent";
import { WalletAuth } from "./WalletAuth";

export function WalletClient() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/wallet/session", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setAuthenticated(data.authenticated);
      }
    } catch {
      // Not authenticated
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleAuthChange = (authed: boolean) => {
    setAuthenticated(authed);
  };

  if (checkingAuth) {
    return (
      <div className="w-full px-6 pt-10 pb-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-text-secondary text-[0.875rem]">Loading wallet…</div>
      </div>
    );
  }

  if (!authenticated) {
    return <WalletAuth onAuthChange={handleAuthChange} />;
  }

  return <WalletContent onLock={checkAuth} />;
}