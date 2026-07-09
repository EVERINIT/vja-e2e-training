import { redirect } from "next/navigation";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ROUTES } from "@/shared/routes";
import { AUTH_CONFIG } from "@/features/auth/auth-config";
import { AuthRegisterForm } from "@/features/auth/ui/auth-register-form";
import { getSessionUser } from "@backend/session";

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) redirect(ROUTES.products);

  return (
    <Box className="mx-auto max-w-md space-y-4 py-8">
      <Box className="space-y-1">
        <Heading level={1}>{AUTH_CONFIG.register.heading}</Heading>
        <Text>{AUTH_CONFIG.register.subtitle}</Text>
      </Box>
      <Card>
        <AuthRegisterForm />
      </Card>
    </Box>
  );
}
