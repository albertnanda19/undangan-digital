import { NextResponse } from "next/server";
import { getAllTenants, createTenant } from "@/lib/supabase/queries";

export async function GET() {
  try {
    const tenants = await getAllTenants();
    return NextResponse.json({ data: tenants, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenant = await createTenant(body);
    return NextResponse.json({ data: tenant, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to create client" },
      { status: 500 }
    );
  }
}
