"use client";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { TESTIDS } from "@/shared/testids";
import { CART_CONFIG } from "../cart-config";
import type { CartLine } from "../cart-types";

interface CartItemProps {
  line: CartLine;
  onRemove: (productId: string) => void;
}

// A single cart row: product name/price/qty + remove button.
export function CartItem({ line, onRemove }: CartItemProps) {
  const { product, qty } = line;
  return (
    <Box className="flex items-center justify-between gap-4 border-b border-gray-100 py-3">
      <Box className="flex items-center gap-3">
        <span className="text-2xl">{product.image}</span>
        <Box>
          <Text className="font-medium text-gray-900">{product.name}</Text>
          <Text>
            ${product.price.toFixed(2)} · {CART_CONFIG.text.qtyLabel} {qty}
          </Text>
        </Box>
      </Box>
      <Button
        variant="secondary"
        data-testid={TESTIDS.removeCartItemBtn}
        data-product-id={product.id}
        onClick={() => onRemove(product.id)}
      >
        {CART_CONFIG.text.remove}
      </Button>
    </Box>
  );
}
