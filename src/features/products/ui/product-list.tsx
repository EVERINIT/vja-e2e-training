"use client";

import { useMemo, useState } from "react";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { TESTIDS } from "@/shared/testids";
import { PRODUCT_CONFIG } from "../product-config";
import { productFilter } from "../lib/product-filter";
import type { ProductCategory, ProductFilterState, ProductItem } from "../product-types";
import { ProductCard } from "./product-card";
import { ProductCategoryFilter } from "./product-category-filter";
import { ProductPriceFilter } from "./product-price-filter";

interface ProductListProps {
  products: ProductItem[];
  categories: ProductCategory[];
  favoriteIds: string[];
}

const INITIAL_STATE: ProductFilterState = {
  category: PRODUCT_CONFIG.categoryAllValue,
  minPrice: "",
  maxPrice: "",
  q: "",
};

export function ProductList({ products, categories, favoriteIds }: ProductListProps) {
  // Client-side filtering over the full catalog for instant updates (per requirement).
  const [filters, setFilters] = useState<ProductFilterState>(INITIAL_STATE);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(favoriteIds));

  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  const visible = useMemo(() => productFilter(products, filters), [products, filters]);

  async function handleToggleFavorite(productId: string) {
    // Optimistic toggle, then reconcile with the server response.
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

  function handleClearFilters() {
    setFilters(INITIAL_STATE);
  }

  return (
    <Box data-testid={TESTIDS.productList} className="space-y-4">
      <Box className="flex flex-wrap items-center gap-4">
        <ProductCategoryFilter
          categories={categories}
          selected={filters.category}
          onSelect={(category) => setFilters((f) => ({ ...f, category }))}
        />
        <ProductPriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinChange={(minPrice) => setFilters((f) => ({ ...f, minPrice }))}
          onMaxChange={(maxPrice) => setFilters((f) => ({ ...f, maxPrice }))}
        />
        <Input
          data-testid={TESTIDS.searchInput}
          aria-label={PRODUCT_CONFIG.text.searchPlaceholder}
          placeholder={PRODUCT_CONFIG.text.searchPlaceholder}
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
          className="w-48"
        />
        <Button
          variant="ghost"
          data-testid={TESTIDS.clearFiltersBtn}
          onClick={handleClearFilters}
        >
          {PRODUCT_CONFIG.text.clearFilters}
        </Button>
      </Box>

      {visible.length === 0 ? (
        <Text data-testid={TESTIDS.noResultsMessage}>{PRODUCT_CONFIG.text.noResults}</Text>
      ) : (
        <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={categoryById.get(product.categoryId)}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
