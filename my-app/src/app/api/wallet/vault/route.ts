import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { ensureVaultSchema } from "@/lib/vault-schema";

const DEFAULT_VAULT = {
  id: "",
  personal: {},
  documents: [] as unknown[],
  settings: { autoLockMinutes: 10 },
};

function emptyVault() {
  return { ...DEFAULT_VAULT, id: crypto.randomUUID() };
}

// GET - Get vault data
export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Make sure the table exists (auto-migrates once per server process)
    await ensureVaultSchema();

    const supabase = createServerSupabaseClient();

    let { data: vaultData, error } = await supabase
      .from("vault_data")
      .select("*")
      .eq("user_id", "default-user")
      .maybeSingle();

    // If Supabase still has a stale schema cache, force a retry once
    if (error && (error.code === "PGRST205" || error.code === "42P01")) {
      await new Promise((r) => setTimeout(r, 500));
      const retry = await supabase
        .from("vault_data")
        .select("*")
        .eq("user_id", "default-user")
        .maybeSingle();
      vaultData = retry.data;
      error = retry.error;
    }

    // Graceful fallback: the client uses localStorage when we return the
    // default structure instead of a hard 500 error.
    if (error) {
      if (error.code === "PGRST205" || error.code === "42P01") {
        console.warn("vault_data table unavailable, returning empty vault:", error.message);
        return NextResponse.json(emptyVault());
      }
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to fetch vault" }, { status: 500 });
    }

    if (!vaultData) {
      return NextResponse.json(emptyVault());
    }

    return NextResponse.json(vaultData);
  } catch (error) {
    console.error("Vault GET error:", error);
    return NextResponse.json(emptyVault());
  }
}

// POST - Save vault data (upsert) or add document
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureVaultSchema();

    const body = await request.json();
    const { personal, documents, settings, document } = body;

    const supabase = createServerSupabaseClient();

    // First, get current vault data
    const { data: currentVault } = await supabase
      .from("vault_data")
      .select("*")
      .eq("user_id", "default-user")
      .maybeSingle();

    // If adding a single document
    if (document) {
      const updatedDocuments = [...((currentVault?.documents as unknown[]) || []), document];

      const vaultData = {
        user_id: "default-user",
        personal: currentVault?.personal || {},
        documents: updatedDocuments,
        settings: currentVault?.settings || { autoLockMinutes: 10 },
        updated_at: new Date().toISOString(),
      };

      const { data: savedData, error } = await supabase
        .from("vault_data")
        .upsert(vaultData, { onConflict: "user_id" })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: "Failed to save document" }, { status: 500 });
      }

      return NextResponse.json(savedData);
    }

    // Otherwise, full vault upsert
    const vaultData = {
      user_id: "default-user",
      personal: personal || {},
      documents: documents || [],
      settings: settings || { autoLockMinutes: 10 },
      updated_at: new Date().toISOString(),
    };

    const { data: savedData, error } = await supabase
      .from("vault_data")
      .upsert(vaultData, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save vault" }, { status: 500 });
    }

    return NextResponse.json(savedData);
  } catch (error) {
    console.error("Vault POST error:", error);
    return NextResponse.json({ error: "Failed to save vault" }, { status: 500 });
  }
}

// DELETE - Remove a document from vault
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureVaultSchema();

    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");

    if (!documentId) {
      return NextResponse.json({ error: "documentId required" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    const { data: currentVault } = await supabase
      .from("vault_data")
      .select("*")
      .eq("user_id", "default-user")
      .maybeSingle();

    if (!currentVault) {
      return NextResponse.json({ error: "Vault not found" }, { status: 404 });
    }

    const docs = (currentVault.documents as { id?: string; path?: string }[]) || [];
    const targetDoc = docs.find((doc) => doc.id === documentId);

    const updatedDocuments = docs.filter((doc) => doc.id !== documentId);

    const vaultData = {
      user_id: "default-user",
      personal: currentVault.personal || {},
      documents: updatedDocuments,
      settings: currentVault.settings || { autoLockMinutes: 10 },
      updated_at: new Date().toISOString(),
    };

    const { data: savedData, error } = await supabase
      .from("vault_data")
      .upsert(vaultData, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }

    // Best-effort: also remove the actual file from private storage so deleted
    // documents don't linger in the bucket.
    if (targetDoc?.path) {
      const { error: removeError } = await supabase.storage
        .from("wallet-documents")
        .remove([targetDoc.path]);

      if (removeError) {
        console.warn("Failed to remove storage object:", removeError.message);
      }
    }

    return NextResponse.json(savedData);
  } catch (error) {
    console.error("Vault DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}
