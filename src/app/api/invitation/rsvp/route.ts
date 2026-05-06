import { NextResponse } from "next/server";
import { createRSVP } from "@/lib/supabase/queries";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const clientIP = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(`rsvp:${clientIP}`, 3, 60000)) {
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
    const rsvp = await createRSVP(body);
    return NextResponse.json({ data: rsvp, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
