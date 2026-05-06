import { NextResponse } from "next/server";
import { getTenantBySlug } from "@/lib/supabase/queries";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const tenant = await getTenantBySlug(slug);
    if (!tenant) {
      return NextResponse.json({ data: null, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data: tenant, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch invitation" },
      { status: 500 }
    );
  }
}
