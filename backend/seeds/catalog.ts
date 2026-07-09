// SOURCE OF TRUTH for base catalog data. Imported by helpers/seeds/services.
// 4 categories, 24 products (6 per category), deterministic ids, emoji images.

export interface SeedCategory {
  id: string;
  name: string;
  slug: string;
}

export interface SeedProduct {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image: string;
  description: string;
}

export const CATEGORIES: SeedCategory[] = [
  { id: "electronics", name: "Electronics", slug: "electronics" },
  { id: "clothing", name: "Clothing", slug: "clothing" },
  { id: "books", name: "Books", slug: "books" },
  { id: "home", name: "Home & Kitchen", slug: "home" },
];

export const PRODUCTS: SeedProduct[] = [
  // Electronics
  { id: "p-elec-1", name: "Gaming Laptop", price: 1199, categoryId: "electronics", image: "💻", description: "High-performance laptop for gaming and work." },
  { id: "p-elec-2", name: "Wireless Headphones", price: 149, categoryId: "electronics", image: "🎧", description: "Noise-cancelling over-ear headphones." },
  { id: "p-elec-3", name: "Smartphone", price: 799, categoryId: "electronics", image: "📱", description: "Latest-generation smartphone." },
  { id: "p-elec-4", name: "USB-C Cable", price: 12, categoryId: "electronics", image: "🔌", description: "Durable braided charging cable." },
  { id: "p-elec-5", name: "Smart Watch", price: 249, categoryId: "electronics", image: "⌚", description: "Fitness and notifications on your wrist." },
  { id: "p-elec-6", name: "Bluetooth Speaker", price: 89, categoryId: "electronics", image: "🔊", description: "Portable speaker with deep bass." },
  // Clothing
  { id: "p-cloth-1", name: "Cotton T-Shirt", price: 19, categoryId: "clothing", image: "👕", description: "Soft everyday cotton tee." },
  { id: "p-cloth-2", name: "Denim Jeans", price: 59, categoryId: "clothing", image: "👖", description: "Classic slim-fit denim jeans." },
  { id: "p-cloth-3", name: "Running Shoes", price: 99, categoryId: "clothing", image: "👟", description: "Lightweight cushioned running shoes." },
  { id: "p-cloth-4", name: "Wool Sweater", price: 79, categoryId: "clothing", image: "🧥", description: "Warm knitted wool sweater." },
  { id: "p-cloth-5", name: "Baseball Cap", price: 15, categoryId: "clothing", image: "🧢", description: "Adjustable cotton cap." },
  { id: "p-cloth-6", name: "Winter Jacket", price: 189, categoryId: "clothing", image: "🧥", description: "Insulated waterproof winter jacket." },
  // Books
  { id: "p-book-1", name: "Mystery Novel", price: 14, categoryId: "books", image: "📕", description: "A gripping detective mystery novel." },
  { id: "p-book-2", name: "Science Fiction Novel", price: 18, categoryId: "books", image: "📘", description: "An epic space-faring sci-fi novel." },
  { id: "p-book-3", name: "Cookbook", price: 29, categoryId: "books", image: "📗", description: "Recipes for everyday home cooking." },
  { id: "p-book-4", name: "History Textbook", price: 65, categoryId: "books", image: "📚", description: "Comprehensive world history reference." },
  { id: "p-book-5", name: "Poetry Collection", price: 11, categoryId: "books", image: "📖", description: "A curated collection of modern poetry." },
  { id: "p-book-6", name: "Programming Guide", price: 45, categoryId: "books", image: "📙", description: "Hands-on guide to software development." },
  // Home & Kitchen
  { id: "p-home-1", name: "Coffee Maker", price: 89, categoryId: "home", image: "☕", description: "Drip coffee maker with timer." },
  { id: "p-home-2", name: "Chef's Knife", price: 49, categoryId: "home", image: "🔪", description: "Stainless steel all-purpose knife." },
  { id: "p-home-3", name: "Cookware Set", price: 199, categoryId: "home", image: "🍳", description: "Non-stick pots and pans set." },
  { id: "p-home-4", name: "Table Lamp", price: 39, categoryId: "home", image: "💡", description: "Adjustable LED desk lamp." },
  { id: "p-home-5", name: "Throw Pillow", price: 25, categoryId: "home", image: "🛋️", description: "Soft decorative throw pillow." },
  { id: "p-home-6", name: "Stand Mixer", price: 349, categoryId: "home", image: "🍰", description: "Powerful kitchen stand mixer." },
];
