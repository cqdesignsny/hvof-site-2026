import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_OPTIONS,
  buildSessionValue,
  checkAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  let payload: { password?: string } = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const password = (payload.password ?? "").trim();
  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password not configured. Set ADMIN_PASSWORD on the server." },
      { status: 503 },
    );
  }
  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, buildSessionValue(), ADMIN_COOKIE_OPTIONS);
  return res;
}
