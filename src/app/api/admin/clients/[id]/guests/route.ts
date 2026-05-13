import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { generateInvitationCode } from "@/lib/utils";
import type { GuestCategory } from "@/types";

async function generateUniqueCode(
  supabase: Awaited<ReturnType<typeof createAdminClient>>
): Promise<string> {
  let code = generateInvitationCode();
  let attempts = 0;
  while (attempts < 10) {
    const { data } = await supabase
      .from("guests")
      .select("id")
      .eq("invitation_code", code)
      .single();
    if (!data) break;
    code = generateInvitationCode();
    attempts++;
  }
  return code;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createAdminClient();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "100");
    const offset = (page - 1) * pageSize;

    let query = supabase
      .from("guests")
      .select("*", { count: "exact" })
      .eq("tenant_id", id)
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    }
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    const guests = (data || []).map((g) => ({
      id: g.id,
      tenantId: g.tenant_id,
      name: g.name,
      phone: g.phone,
      invitationCode: g.invitation_code,
      category: g.category,
      isVip: g.is_vip,
      seatNumber: g.seat_number,
      notes: g.notes,
      createdAt: g.created_at,
    }));

    return NextResponse.json({
      data: guests,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
      error: null,
    });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch guests" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createAdminClient();
    const body = await request.json();

    if (Array.isArray(body.guests)) {
      const guestsToInsert = body.guests.map((g: Record<string, unknown>) => ({
        tenant_id: id,
        name: g.name as string,
        phone: (g.phone as string) || null,
        invitation_code: (g.invitationCode as string) || generateInvitationCode(),
        category: ((g.category as string) || "friend") as GuestCategory,
        is_vip: Boolean(g.isVip),
        seat_number: (g.seatNumber as string) || null,
        notes: (g.notes as string) || null,
      }));

      const { data, error } = await supabase
        .from("guests")
        .insert(guestsToInsert)
        .select();
      if (error) throw error;
      return NextResponse.json({ data, error: null }, { status: 201 });
    }

    if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
      return NextResponse.json(
        { data: null, error: "Nama tamu minimal 2 karakter" },
        { status: 400 }
      );
    }

    const invitationCode = await generateUniqueCode(supabase);

    const { data, error } = await supabase
      .from("guests")
      .insert({
        tenant_id: id,
        name: body.name.trim(),
        phone: body.phone?.trim() || null,
        invitation_code: invitationCode,
        category: (body.category || "friend") as GuestCategory,
        is_vip: body.isVip || false,
        seat_number: body.seatNumber?.trim() || null,
        notes: body.notes?.trim() || null,
      })
      .select()
      .single();

    if (error) throw error;

    const guest = {
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
    };

    return NextResponse.json({ data: guest, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to create guest" },
      { status: 500 }
    );
  }
}
