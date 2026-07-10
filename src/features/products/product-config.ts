import { API } from "@/shared/routes";

// All product-feature text + API paths in one place (as const).
export const PRODUCT_CONFIG = {
  text: {
    heading: "Products",
    subtitle: "Browse the catalog, filter and search, then add items to your cart.",
    filtersLabel: "Filters",
    searchPlaceholder: "Search products...",
    categoryLabel: "Category",
    categoryAll: "All",
    priceLabel: "Price range",
    priceMinLabel: "Min price",
    priceMaxLabel: "Max price",
    priceMinPlaceholder: "Min",
    priceMaxPlaceholder: "Max",
    clearFilters: "Clear filters",
    noResultsTitle: "No products found",
    noResults: "No products match your filters.",
    addToCart: "Add to cart",
    favorite: "Favorite",
    reviewsLabel: "reviews",
  },
  badges: {
    new: "New",
    trending: "Trending",
  },
  home: {
    heroBadge: "New season, fresh picks",
    heroTitle: "Everything you need, delivered fast.",
    heroSubtitle:
      "Shop electronics, clothing, books and home essentials in one place, with free shipping on every order.",
    heroCta: "Shop products",
    heroSecondaryCta: "Browse categories",
    heroShipping: "Free shipping and easy 30-day returns.",
    heroImageId: "p-elec-2",
    categoriesTitle: "Shop by category",
    categoriesSubtitle: "Find what you are looking for across four curated departments.",
    popularTitle: "Popular products",
    popularSubtitle: "Trending picks our shoppers love this week.",
    popularCta: "View all products",
  },
  // Representative product photo per category for the home "Shop by category" grid.
  categoryImages: {
    electronics: "p-elec-1",
    clothing: "p-cloth-3",
    books: "p-book-1",
    home: "p-home-1",
  } as Record<string, string>,
  categoryAllValue: "all",
  api: {
    products: API.products,
    favorites: API.favorites,
    cart: API.cart,
  },
} as const;
