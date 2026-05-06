import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("amplop_transactions")
      .insert({
        tenant_id: body.tenantId,
        sender_name: body.senderName,
        sender_phone: body.senderPhone,
        amount: body.amount,
        bank_destination: body.bankDestination,
        message: body.message,
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to submit amplop" },
      { status: 500 }
    );
  }
}
