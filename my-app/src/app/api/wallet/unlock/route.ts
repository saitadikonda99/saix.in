import { NextRequest, NextResponse } from "next/server";
import { verifyPassphrase, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { passphrase } = await request.json();
    
    if (!passphrase) {
      return NextResponse.json({ error: "Passphrase required" }, { status: 400 });
    }

    if (!verifyPassphrase(passphrase)) {
      // Rate limiting would be handled by middleware or external service
      return NextResponse.json({ error: "Invalid passphrase" }, { status: 401 });
    }

    const token = await createSession();
    await setSessionCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wallet unlock error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}