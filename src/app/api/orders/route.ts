import { NextResponse } from "next/server";
import { getSessionUserId } from "@backend/session";
import { checkout } from "@backend/services/orders-service";

export async function POST() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const result = checkout(userId);
  if ("error" in result) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
