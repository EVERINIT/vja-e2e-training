import { API } from "@/shared/routes";

// All cart/checkout text + api paths. No bare text in components.
export const CART_CONFIG = {
  heading: "Your Cart",
  text: {
    empty: "Your cart is empty.",
    totalLabel: "Total",
    qtyLabel: "Qty",
    remove: "Remove",
    checkout: "Checkout",
    checkingOut: "Placing order...",
    success: "Order placed successfully!",
    emptyCartError: "Your cart is empty. Add items before checking out.",
    genericError: "Something went wrong. Please try again.",
  },
  api: {
    cart: API.cart,
    cartItem: API.cartItem,
    orders: API.orders,
  },
} as const;
