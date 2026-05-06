import { NextResponse } from "next/server";
import { getTenantById, updateTenant, deleteTenant } from "@/lib/supabase/queries";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tenant = await getTenantById(id);
    return NextResponse.json({ data: tenant, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const tenant = await updateTenant(id, body);
    return NextResponse.json({ data: tenant, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to update client" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteTenant(id);
    return NextResponse.json({ data: null, error: null, message: "Client deactivated" });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to delete client" },
      { status: 500 }
    );
  }
}
