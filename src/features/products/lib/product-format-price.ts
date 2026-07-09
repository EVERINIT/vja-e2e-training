// Formats a numeric price into a display string with two decimals.
export function productFormatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
