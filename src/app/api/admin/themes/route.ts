import { NextResponse } from "next/server";
import { getAllThemes } from "@/lib/supabase/queries";
import { DEFAULT_THEMES } from "@/lib/constants/themes";

export async function GET() {
  try {
    const themes = await getAllThemes();
    return NextResponse.json({ data: themes.length > 0 ? themes : DEFAULT_THEMES, error: null });
  } catch {
    return NextResponse.json({ data: DEFAULT_THEMES, error: null });
  }
}
