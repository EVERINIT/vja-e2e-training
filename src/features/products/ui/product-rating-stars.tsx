import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_CONFIG } from "../product-config";
import { productRating } from "../lib/product-rating";

interface ProductRatingStarsProps {
  productId: string;
  className?: string;
}

// Display-only star row + review count. Numbers come from a pure helper, never the DB.
export function ProductRatingStars({ productId, className }: ProductRatingStarsProps) {
  const { stars, reviewCount } = productRating(productId);
  const filled = Math.round(stars);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < filled ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"
            )}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-foreground">{stars.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">
        ({reviewCount} {PRODUCT_CONFIG.text.reviewsLabel})
      </span>
    </div>
  );
}
