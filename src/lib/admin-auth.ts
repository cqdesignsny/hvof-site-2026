/**
 * Floorplan admin auth.
 * Stateless cookie-based password gate. No external services required.
 *
 * Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in environment.
 * Cookie value is `<expiry-ms>.<hmac-sha256>`. We verify by recomputing the HMAC
 * with the secret and comparing in constant time.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "hvof-floorplan";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    // Fallback for dev: derive from ADMIN_PASSWORD so things work without a separate var.
    // In production this should be a real long random string.
    return (process.env.ADMIN_PASSWORD || "dev-fallback-secret-rotate-me") + "::session";
  }
  return s;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function buildSessionValue(): string {
  const exp = String(Date.now() + SESSION_DURATION_MS);
  return `${exp}.${sign(exp)}`;
}

export function isValidSessionValue(value: string | undefined | null): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [expStr, sig] = parts;
  const expNum = Number(expStr);
  if (!expNum || Number.isNaN(expNum) || expNum < Date.now()) return false;
  const expected = sign(expStr);
  if (expected.length !== sig.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthed(): Promise<boolean> {
  const c = await cookies();
  return isValidSessionValue(c.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin(redirectTo: string = "/admin/login"): Promise<void> {
  if (!(await isAdminAuthed())) {
    redirect(redirectTo);
  }
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_DURATION_MS / 1000,
};
