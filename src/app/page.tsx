import Link from "next/link";
import { ArrowRight, Sparkles, Truck } from "lucide-react";
import { ROUTES } from "@/shared/routes";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { PRODUCT_CONFIG } from "@/features/products/product-config";
import {
  CATALOG_CATEGORIES,
  CATALOG_PRODUCTS,
  catalogProductById,
} from "@/features/products/lib/product-catalog";
import { ProductShowcase } from "@/features/products/ui/product-showcase";

const HOME = PRODUCT_CONFIG.home;

// Storefront landing page: hero, category grid, and a popular-products row.
export default function HomePage() {
  const heroImage = catalogProductById(HOME.heroImageId);
  const popular = CATALOG_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            {HOME.heroBadge}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {HOME.heroTitle}
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">{HOME.heroSubtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={ROUTES.products}>
                {HOME.heroCta}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#categories">{HOME.heroSecondaryCta}</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="size-4 text-primary" />
            {HOME.heroShipping}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-sm">
          {heroImage && (
            <img
              src={heroImage.imageUrl}
              alt={heroImage.name}
              className="size-full object-cover"
            />
          )}
        </div>
      </section>

      <section id="categories" className="space-y-6 scroll-mt-24">
        <Box className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {HOME.categoriesTitle}
          </h2>
          <p className="text-sm text-muted-foreground">{HOME.categoriesSubtitle}</p>
        </Box>
        <Box className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATALOG_CATEGORIES.map((category) => {
            const imageId = PRODUCT_CONFIG.categoryImages[category.id];
            return (
              <Link
                key={category.id}
                href={`${ROUTES.products}?category=${category.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-sm"
              >
                <img
                  src={`/products/${imageId}.jpg`}
                  alt={category.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-sm font-semibold text-white">
                  {category.name}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </Box>
      </section>

      <section className="space-y-6">
        <Box className="flex items-end justify-between gap-4">
          <Box className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {HOME.popularTitle}
            </h2>
            <p className="text-sm text-muted-foreground">{HOME.popularSubtitle}</p>
          </Box>
          <Button asChild variant="outline" className="hidden shrink-0 sm:inline-flex">
            <Link href={ROUTES.products}>
              {HOME.popularCta}
              <ArrowRight />
            </Link>
          </Button>
        </Box>
        <ProductShowcase products={popular} categories={CATALOG_CATEGORIES} />
      </section>
    </div>
  );
}
