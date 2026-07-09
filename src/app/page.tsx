import Link from "next/link";
import { ROUTES } from "@/shared/routes";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

export default function HomePage() {
  return (
    <Box className="space-y-4">
      <Heading level={1}>Welcome to the VJA E2E Training Store</Heading>
      <Text>
        This is a QA training mini online store. Browse products, manage a cart and favorites,
        and check out. It exists so you can practice writing Playwright end-to-end tests against
        stable data-testids.
      </Text>
      <Box className="flex gap-3">
        <Link href={ROUTES.login}>
          <Button variant="primary">Log in</Button>
        </Link>
        <Link href={ROUTES.products}>
          <Button variant="secondary">Browse products</Button>
        </Link>
      </Box>
    </Box>
  );
}
