import { PRODUCT_CONFIG } from "../product-config";
import type { ProductFilterState, ProductItem } from "../product-types";

// Client-side mirror of the server filter: category, inclusive price range, case-insensitive name search.
export function productFilter(items: ProductItem[], state: ProductFilterState): ProductItem[] {
  const q = state.q.trim().toLowerCase();
  const min = state.minPrice.trim() === "" ? null : Number(state.minPrice);
  const max = state.maxPrice.trim() === "" ? null : Number(state.maxPrice);

  return items.filter((p) => {
    if (state.category !== PRODUCT_CONFIG.categoryAllValue && p.categoryId !== state.category) return false;
    if (min != null && !Number.isNaN(min) && p.price < min) return false;
    if (max != null && !Number.isNaN(max) && p.price > max) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });
}
