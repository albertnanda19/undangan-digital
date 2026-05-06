import { NextResponse } from "next/server";
import { getGuestsByTenant, bulkCreateGuests } from "@/lib/supabase/queries";
import type { GuestCategory } from "@/types";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const guests = await getGuestsByTenant(id);
    return NextResponse.json({ data: guests, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch guests" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { guests } = body;

    if (!Array.isArray(guests) || guests.length === 0) {
      return NextResponse.json({ data: null, error: "No guests provided" }, { status: 400 });
    }

    const guestsWithTenant = guests.map((g: Record<string, unknown>) => ({
      tenantId: id,
      name: g.name as string,
      phone: (g.phone as string) || undefined,
      invitationCode: (g.invitationCode as string) || "",
      category: ((g.category as string) || "friend") as GuestCategory,
      isVip: Boolean(g.isVip),
      seatNumber: (g.seatNumber as string) || undefined,
      notes: (g.notes as string) || undefined,
    }));

    const result = await bulkCreateGuests(guestsWithTenant);
    return NextResponse.json({ data: result, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to import guests" },
      { status: 500 }
    );
  }
}
