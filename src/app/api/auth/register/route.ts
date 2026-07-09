import { NextResponse } from "next/server";
import { authRegisterSchema } from "@/features/auth/auth-schemas";
import { authFirstIssue } from "@/features/auth/lib/auth-first-issue";
import { AUTH_CONFIG } from "@/features/auth/auth-config";
import { registerUser, DuplicateEmailError } from "@backend/services/auth-service";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = authRegisterSchema.safeParse(body);

  if (!parsed.success) {
    const { field, message } = authFirstIssue(parsed.error);
    return NextResponse.json({ error: message, field }, { status: 400 });
  }

  try {
    const user = registerUser(parsed.data);
    // Register does NOT auto-login (CONTRACT §8); login sets the cookie.
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    if (err instanceof DuplicateEmailError) {
      return NextResponse.json({ error: AUTH_CONFIG.messages.emailTaken }, { status: 409 });
    }
    throw err;
  }
}
