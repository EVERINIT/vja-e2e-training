import { API } from "@/shared/routes";

// All product-feature text + API paths in one place (as const).
export const PRODUCT_CONFIG = {
  text: {
    heading: "Products",
    searchPlaceholder: "Search products...",
    categoryAll: "All",
    priceMinLabel: "Min price",
    priceMaxLabel: "Max price",
    priceMinPlaceholder: "Min",
    priceMaxPlaceholder: "Max",
    clearFilters: "Clear filters",
    noResults: "No products match your filters.",
    addToCart: "Add to cart",
    favorite: "Favorite",
  },
  categoryAllValue: "all",
  api: {
    products: API.products,
    favorites: API.favorites,
    cart: API.cart,
  },
} as const;
