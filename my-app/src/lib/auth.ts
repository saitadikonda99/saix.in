import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const SESSION_COOKIE = "wallet_session";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

// Get passphrase from environment
function getPassphrase(): string {
  const passphrase = process.env.WALLET_PASSPHRASE;
  if (!passphrase) {
    throw new Error("WALLET_PASSPHRASE not set in environment");
  }
  return passphrase;
}

// Verify passphrase
export function verifyPassphrase(input: string): boolean {
  return input === getPassphrase();
}

// Create session token
export async function createSession(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.WALLET_SESSION_SECRET || "dev-secret-change-in-production");
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION / 1000}s`)
    .sign(secret);
  return token;
}

// Verify session token
export async function verifySession(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.WALLET_SESSION_SECRET || "dev-secret-change-in-production");
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// Get session from request
export async function getSession(request?: NextRequest): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  
  const valid = await verifySession(token);
  return valid ? token : null;
}

// Set session cookie
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });
}

// Clear session cookie
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// Check if wallet is locked (no valid session)
export async function isWalletLocked(request?: NextRequest): Promise<boolean> {
  const session = await getSession(request);
  return !session;
}