import type { ZodError } from "zod";
import type { AuthErrorField } from "../auth-types";

// Pull the first validation issue from a ZodError as { field, message }.
export function authFirstIssue(error: ZodError): { field: AuthErrorField; message: string } {
  const issue = error.issues[0];
  const field = (issue?.path[0] as AuthErrorField) ?? "email";
  return { field, message: issue?.message ?? "Invalid input" };
}
