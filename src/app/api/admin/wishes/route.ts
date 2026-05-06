import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { approveWish, deleteWish } from "@/lib/supabase/queries";

export async function GET() {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ data, error: null });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (body.action === "approve" && body.id) {
      await approveWish(body.id);
      return NextResponse.json({ data: null, error: null, message: "Wish approved" });
    }
    return NextResponse.json({ data: null, error: "Invalid action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to update wish" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ data: null, error: "ID required" }, { status: 400 });
    await deleteWish(id);
    return NextResponse.json({ data: null, error: null, message: "Wish deleted" });
  } catch (err) {
    return NextResponse.json(
      { data: null, error: err instanceof Error ? err.message : "Failed to delete wish" },
      { status: 500 }
    );
  }
}
