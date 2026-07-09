import type { APIRequestContext } from "@playwright/test";

// Calls the DEV/TEST-only seed endpoint to put the DB into a known state.
// Base URL is 3100 per CONTRACT §7.
export async function seed(request: APIRequestContext, name: string): Promise<void> {
  const res = await request.post("http://localhost:3100/api/test/seed", {
    data: { name },
  });
  if (!res.ok()) {
    throw new Error(`seed "${name}" failed: ${res.status()} ${await res.text()}`);
  }
}
