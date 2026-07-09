import { NextResponse } from "next/server";
import { authLoginSchema } from "@/features/auth/auth-schemas";
import { authFirstIssue } from "@/features/auth/lib/auth-first-issue";
import { AUTH_CONFIG } from "@/features/auth/auth-config";
import { authenticateUser } from "@backend/services/auth-service";
import { createSession } from "@backend/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = authLoginSchema.safeParse(body);

  if (!parsed.success) {
    const { field, message } = authFirstIssue(parsed.error);
    return NextResponse.json({ error: message, field }, { status: 400 });
  }

  const user = authenticateUser(parsed.data);
  if (!user) {
    return NextResponse.json(
      { error: AUTH_CONFIG.messages.invalidCredentials },
      { status: 401 }
    );
  }

  await createSession(user.id);
  return NextResponse.json({ user }, { status: 200 });
}
