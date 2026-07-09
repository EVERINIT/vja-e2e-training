import type { Category, Product } from "@backend/db/schema";

export type ProductItem = Product;
export type ProductCategory = Category;

export interface ProductFilterState {
  category: string;
  minPrice: string;
  maxPrice: string;
  q: string;
}
