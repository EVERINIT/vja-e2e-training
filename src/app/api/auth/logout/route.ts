import { NextResponse } from "next/server";
import { clearSession } from "@backend/session";

export async function POST() {
  await clearSession();
  return NextResponse.json({ ok: true }, { status: 200 });
}
