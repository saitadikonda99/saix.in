import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { ensureVaultSchema } from "@/lib/vault-schema";

const BUCKET = "wallet-documents";

// POST - Upload a document file and add it to the vault
export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureVaultSchema();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = (formData.get("name") as string | null)?.trim();
    const category = (formData.get("category") as string | null) || "Other";

    if (!file || !name) {
      return NextResponse.json({ error: "File and name are required" }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Ensure the bucket exists (safe if it already does)
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.some((b) => b.name === BUCKET)) {
        await supabase.storage.createBucket(BUCKET, {
          public: false,
          fileSizeLimit: 52428800,
        });
      }
    } catch {
      // Bucket may already exist or list permission is restricted
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `wallet/${Date.now()}-${Math.random().toString(36).slice(2, 10)}-${safeName}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, arrayBuffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "application/octet-stream",
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Private bucket: create a long-lived signed URL
    const { data: signed, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year

    if (signError) {
      console.error("Signed URL error:", signError);
      return NextResponse.json({ error: signError.message }, { status: 500 });
    }

    const fileExt = file.name.split(".").pop() || "file";
    const newDoc = {
      id: crypto.randomUUID(),
      name,
      category,
      url: signed.signedUrl,
      path: filePath,
      type: fileExt,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };

    // Append to vault docs
    const { data: currentVault } = await supabase
      .from("vault_data")
      .select("*")
      .eq("user_id", "default-user")
      .maybeSingle();

    const vaultData = {
      user_id: "default-user",
      personal: currentVault?.personal || {},
      documents: [...((currentVault?.documents as unknown[]) || []), newDoc],
      settings: currentVault?.settings || { autoLockMinutes: 10 },
      updated_at: new Date().toISOString(),
    };

    const { data: savedData, error: saveError } = await supabase
      .from("vault_data")
      .upsert(vaultData, { onConflict: "user_id" })
      .select()
      .single();

    if (saveError) {
      console.error("Vault save error:", saveError);
      return NextResponse.json({ error: "File uploaded but failed to save record" }, { status: 500 });
    }

    return NextResponse.json(savedData, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
