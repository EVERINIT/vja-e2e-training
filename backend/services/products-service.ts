import { db } from "../db/client";
import { categories, products, type Category, type Product } from "../db/schema";

export interface ListProductsFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
}

// Filters the full catalog: category match, inclusive price range, case-insensitive name search.
export function listProducts(filter: ListProductsFilter = {}): Product[] {
  const all = db.select().from(products).all();
  const q = filter.q?.trim().toLowerCase();
  return all.filter((p) => {
    if (filter.category && filter.category !== "all" && p.categoryId !== filter.category) return false;
    if (filter.minPrice != null && p.price < filter.minPrice) return false;
    if (filter.maxPrice != null && p.price > filter.maxPrice) return false;
    if (q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function listCategories(): Category[] {
  return db.select().from(categories).all();
}
