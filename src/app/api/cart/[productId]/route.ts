import { NextResponse, type NextRequest } from "next/server";
import { getSessionUserId } from "@backend/session";
import { getCart, removeFromCart } from "@backend/services/cart-service";

// Next.js 15 route context params are async.
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { productId } = await params;
  removeFromCart(userId, productId);
  return NextResponse.json(getCart(userId));
}
