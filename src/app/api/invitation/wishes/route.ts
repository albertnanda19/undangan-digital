import { NextResponse } from "next/server";
import { createWish, getWishesByTenant } from "@/lib/supabase/queries";
import { isRateLimited } from "@/lib/rateLimit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get("tenantId");
    if (!tenantId) {
      return NextResponse.json({ data: null, error: "tenantId required" }, { status: 400 });
    }
    const wishes = await getWishesByTenant(tenantId, true);
    return NextResponse.json({ data: wishes, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const clientIP = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(`wish:${clientIP}`, 5, 60000)) {
    return NextResponse.json(
      { data: null, error: "Terlalu banyak permintaan. Coba lagi dalam 1 menit." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    if (body.website) {
      return NextResponse.json({ data: null, error: null }, { status: 200 });
    }
    const wish = await createWish(body);
    return NextResponse.json({ data: wish, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to submit wish" },
      { status: 500 }
    );
  }
}
