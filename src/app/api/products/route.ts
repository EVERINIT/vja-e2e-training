import { NextResponse, type NextRequest } from "next/server";
import { getSessionUserId } from "@backend/session";
import { listCategories, listProducts } from "@backend/services/products-service";

export async function GET(request: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const params = request.nextUrl.searchParams;
  const minPriceRaw = params.get("minPrice");
  const maxPriceRaw = params.get("maxPrice");

  const products = listProducts({
    category: params.get("category") ?? undefined,
    minPrice: minPriceRaw != null && minPriceRaw !== "" ? Number(minPriceRaw) : undefined,
    maxPrice: maxPriceRaw != null && maxPriceRaw !== "" ? Number(maxPriceRaw) : undefined,
    q: params.get("q") ?? undefined,
  });

  return NextResponse.json({ products, categories: listCategories() });
}
