import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; guestId: string }> }
) {
  try {
    const { id, guestId } = await params;
    const supabase = await createAdminClient();

    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("id", guestId)
      .eq("tenant_id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, error: null });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to delete guest" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; guestId: string }> }
) {
  try {
    const { id, guestId } = await params;
    const supabase = await createAdminClient();
    const body = await request.json();

    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.phone !== undefined) updateData.phone = body.phone?.trim() || null;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.isVip !== undefined) updateData.is_vip = body.isVip;
    if (body.seatNumber !== undefined) updateData.seat_number = body.seatNumber?.trim() || null;
    if (body.notes !== undefined) updateData.notes = body.notes?.trim() || null;

    const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", guestId)
      .eq("tenant_id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      data: {
        id: data.id,
        tenantId: data.tenant_id,
        name: data.name,
        phone: data.phone,
        invitationCode: data.invitation_code,
        category: data.category,
        isVip: data.is_vip,
        seatNumber: data.seat_number,
        notes: data.notes,
        createdAt: data.created_at,
      },
      error: null,
    });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to update guest" },
      { status: 500 }
    );
  }
}
