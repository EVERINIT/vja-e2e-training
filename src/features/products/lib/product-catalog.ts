import { CATEGORIES, PRODUCTS } from "@backend/seeds/catalog";
import type { ProductCategory, ProductItem } from "../product-types";

// Static catalog snapshot (no DB) for cosmetic storefront sections like the home
// page category grid and popular-products row. The real product images live at
// /products/<id>.jpg, mirroring the imageUrl column the services expose.
export const CATALOG_CATEGORIES: ProductCategory[] = CATEGORIES;

export const CATALOG_PRODUCTS: ProductItem[] = PRODUCTS.map((p) => ({
  ...p,
  imageUrl: `/products/${p.id}.jpg`,
}));

export function catalogProductById(id: string): ProductItem | undefined {
  return CATALOG_PRODUCTS.find((p) => p.id === id);
}
