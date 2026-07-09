"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { TESTIDS } from "@/shared/testids";
import { PRODUCT_CONFIG } from "../product-config";
import { productFormatPrice } from "../lib/product-format-price";
import type { ProductCategory, ProductItem } from "../product-types";

interface ProductCardProps {
  product: ProductItem;
  category?: ProductCategory;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export function ProductCard({ product, category, isFavorite, onToggleFavorite }: ProductCardProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleAddToCart() {
    setBusy(true);
    try {
      await fetch(PRODUCT_CONFIG.api.cart, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      // Refresh so the server-rendered header cart-count updates.
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card data-testid={TESTIDS.productCard} data-product-id={product.id} className="flex flex-col gap-2">
      <Box className="text-4xl" aria-hidden>
        {product.image}
      </Box>
      <Heading level={3}>{product.name}</Heading>
      <Badge>{category?.name ?? product.categoryId}</Badge>
      <Text className="font-semibold">{productFormatPrice(product.price)}</Text>
      <Box className="mt-auto flex items-center gap-2">
        <Button
          data-testid={TESTIDS.addToCartBtn}
          data-product-id={product.id}
          onClick={handleAddToCart}
          disabled={busy}
        >
          {PRODUCT_CONFIG.text.addToCart}
        </Button>
        <Button
          variant="secondary"
          data-testid={TESTIDS.favoriteBtn}
          data-product-id={product.id}
          data-active={isFavorite ? "true" : "false"}
          onClick={() => onToggleFavorite(product.id)}
        >
          {isFavorite ? "★" : "☆"}
        </Button>
      </Box>
    </Card>
  );
}
