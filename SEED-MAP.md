# Seed Map (stub)

Maps each e2e spec to the seed it runs in `beforeEach` and the testids it targets.
The seeds agent finalizes the seed scripts; this table mirrors CONTRACT §7.

| spec | seed | testids |
|---|---|---|
| `tests/auth/register.spec.ts` | `reset-users` | `register-form`, `email-error`, `password-error` |
| `tests/auth/login.spec.ts` | `user-registered` | `login-form`, `login-error` |
| `tests/products/product-list.spec.ts` | `catalog-default` | `product-list`, `product-card` |
| `tests/products/favorites.spec.ts` | `user-no-favorites` | `favorite-btn` |
| `tests/products/category-filter.spec.ts` | `catalog-default` | `category-filter`, `category-option-*` |
| `tests/products/price-filter.spec.ts` | `catalog-default` | `price-filter`, `price-min-input`, `price-max-input` |
| `tests/products/search.spec.ts` | `catalog-search-match` | `search-input`, `no-results-message` |
| `tests/products/clear-filters.spec.ts` | `catalog-default` | `clear-filters-btn` |
| `tests/cart/add-to-cart.spec.ts` | `user-empty-cart` | `add-to-cart-btn`, `cart-count` |
| `tests/cart/remove-from-cart.spec.ts` | `user-cart-has-items` | `remove-cart-item-btn` |
| `tests/cart/checkout.spec.ts` | `user-cart-has-items` | `checkout-btn`, `order-success-message` |
| `tests/cart/empty-checkout.spec.ts` | `user-empty-cart` | `checkout-btn` (-> error) |

## Seed catalog

| seed name | guarantees |
|---|---|
| `base` | reset everything, ensure catalog, no users |
| `reset-users` | catalog present, users/favorites/cart/orders empty |
| `user-registered` | catalog + e2e user exists, empty cart/favorites |
| `user-empty-cart` | e2e user, catalog, cart empty, favorites empty |
| `user-cart-has-items` | e2e user, catalog, cart has 2 known products, favorites empty |
| `user-no-favorites` | e2e user, catalog, favorites empty |
| `user-has-favorites` | e2e user, catalog, 1 known product favorited |
| `catalog-default` | e2e user, full catalog, clean filters state |
| `catalog-search-match` | e2e user, catalog with a product named for search test |
| `catalog-no-match` | e2e user, catalog (for search-yields-nothing test) |

Known e2e user: email `e2e@test.com`, password `123456`, name `E2E User`.

## Adding a new test + seed pair

1. Add a seed script `backend/seeds/scripts/<name>.ts` exporting `seed<Name>()`; it must call
   `resetTables()` for the tables it owns, then set exactly the state it names
   (`ensureCatalog()` for catalog).
2. Register it in `backend/seeds/registry.ts` (`<name>: seed<Name>`).
3. Add the spec under `e2e/tests/...` with `beforeEach(async ({ seed }) => seed('<name>'))`.
4. Document the pair in the table above.
