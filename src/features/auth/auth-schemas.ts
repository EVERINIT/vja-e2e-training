import { z } from "zod";
import { AUTH_CONFIG } from "./auth-config";

export const authRegisterSchema = z.object({
  name: z.string().trim().min(1, AUTH_CONFIG.messages.nameRequired),
  email: z.string().email(AUTH_CONFIG.messages.emailInvalid),
  password: z.string().min(6, AUTH_CONFIG.messages.passwordTooShort),
});

// Login only checks the field is present; any credential mismatch (including a
// too-short password) must surface as a 401 auth error, not a 400 validation error.
export const authLoginSchema = z.object({
  email: z.string().email(AUTH_CONFIG.messages.emailInvalid),
  password: z.string().min(1, AUTH_CONFIG.messages.passwordRequired),
});

export type AuthRegisterInput = z.infer<typeof authRegisterSchema>;
export type AuthLoginInput = z.infer<typeof authLoginSchema>;
