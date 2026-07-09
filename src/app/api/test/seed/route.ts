import { NextResponse } from "next/server";
import { seedRegistry } from "@backend/seeds/registry";

// Test-only endpoint: resets the DB to a named seed state so a single e2e test
// gets exactly the data it needs (CONTRACT §4, §6). Disabled in production.
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "disabled_in_production" }, { status: 403 });
  }

  let name: string | undefined;
  try {
    const body = (await request.json()) as { name?: string };
    name = body.name;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!name || !(name in seedRegistry)) {
    return NextResponse.json(
      { error: "unknown_seed", name, available: Object.keys(seedRegistry) },
      { status: 400 },
    );
  }

  // better-sqlite3 seeds are synchronous.
  seedRegistry[name]();
  return NextResponse.json({ ok: true, name });
}
