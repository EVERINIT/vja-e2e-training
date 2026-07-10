// Small deterministic string hash so display-only extras (ratings, badges) stay
// stable per product id without touching the database.
export function productHash(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}
