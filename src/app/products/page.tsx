import { redirect } from "next/navigation";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ROUTES } from "@/shared/routes";
import { getSessionUser } from "@backend/session";
import {
  listBrands,
  listCategories,
  listColors,
  listProducts,
} from "@backend/services/products-service";
import { getFavoriteProductIds } from "@backend/services/favorites-service";
import { PRODUCT_CONFIG } from "@/features/products/product-config";
import { ProductList } from "@/features/products/ui/product-list";

interface ProductsPageProps {
  // Next 15 passes searchParams as a promise. `?category=<id>` deep-links from the
  // home category tiles and pre-selects that filter.
  searchParams: Promise<{ category?: string }>;
}

// Server component: products are visible only after login.
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const user = await getSessionUser();
  if (!user) redirect(ROUTES.login);

  const products = listProducts();
  const categories = listCategories();
  const brands = listBrands();
  const colors = listColors();
  const favoriteIds = getFavoriteProductIds(user.id);

  // Honor a valid ?category= deep-link; ignore anything not a real category id.
  const { category } = await searchParams;
  const initialCategory =
    category && categories.some((c) => c.id === category)
      ? category
      : PRODUCT_CONFIG.categoryAllValue;

  return (
    <Box className="space-y-8">
      <Box className="space-y-1">
        <Heading level={1}>{PRODUCT_CONFIG.text.heading}</Heading>
        <Text className="text-base">{PRODUCT_CONFIG.text.subtitle}</Text>
      </Box>
      <ProductList
        products={products}
        categories={categories}
        brands={brands}
        colors={colors}
        favoriteIds={favoriteIds}
        initialCategory={initialCategory}
      />
    </Box>
  );
}
