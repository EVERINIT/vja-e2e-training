"use client";

import { useMemo, useState } from "react";
import { Box } from "@/components/ui/box";
import { PRODUCT_CONFIG } from "../product-config";
import type { ProductCategory, ProductItem } from "../product-types";
import { ProductCard } from "./product-card";

interface ProductShowcaseProps {
  products: ProductItem[];
  categories: ProductCategory[];
}

// Cosmetic product row for the storefront landing page. Reuses ProductCard so
// cards look identical to the catalog; favorites toggle optimistically (and
// persist only when signed in, mirroring the catalog behavior).
export function ProductShowcase({ products, categories }: ProductShowcaseProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  async function handleToggleFavorite(productId: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
    const res = await fetch(PRODUCT_CONFIG.api.favorites, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      const data = (await res.json()) as { productIds: string[] };
      setFavorites(new Set(data.productIds));
    }
  }

  return (
    <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          category={categoryById.get(product.categoryId)}
          isFavorite={favorites.has(product.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </Box>
  );
}
