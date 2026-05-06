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

    const tenantData: Record<string, unknown> = {
      slug: body.slug,
      groomName: body.groomName,
      brideName: body.brideName,
      groomNickname: body.groomNickname,
      brideNickname: body.brideNickname,
      groomFather: body.groomFather,
      groomMother: body.groomMother,
      brideFather: body.brideFather,
      brideMother: body.brideMother,
      groomPhotoUrl: body.groomPhotoUrl || null,
      bridePhotoUrl: body.bridePhotoUrl || null,
      akadDate: body.akadDate,
      akadTimeStart: body.akadTimeStart,
      akadTimeEnd: body.akadTimeEnd,
      akadVenueName: body.akadVenueName,
      akadVenueAddress: body.akadVenueAddress,
      akadMapsUrl: body.akadMapsUrl || null,
      receptionDate: body.receptionDate,
      receptionTimeStart: body.receptionTimeStart,
      receptionTimeEnd: body.receptionTimeEnd,
      receptionVenueName: body.receptionVenueName,
      receptionVenueAddress: body.receptionVenueAddress,
      receptionMapsUrl: body.receptionMapsUrl || null,
      themeId: body.themeId || null,
      isActive: true,
      isPasswordProtected: body.isPasswordProtected || false,
      showAmplopDigital: body.showAmplopDigital || false,
      bankAccounts: body.bankAccounts || [],
      expiresAt: body.expiresAt ? new Date(body.expiresAt).toISOString() : null,
      loveStory: body.loveStory || null,
      musicUrl: body.musicUrl || null,
      coverPhotoUrl: body.coverPhotoUrl || null,
      dresscode: body.dresscode || null,
      additionalNotes: body.additionalNotes || null,
      closingMessage: body.closingMessage || null,
      lottieAnimationUrl: body.lottieAnimationUrl || null,
      lottieAnimationPosition: body.lottieAnimationPosition || null,
    };

    const tenant = await createTenant(tenantData);
    return NextResponse.json({ data: tenant, error: null }, { status: 201 });
  } catch (err: unknown) {
    let message = "Failed to create client";
    const e = err as Record<string, unknown>;
    if (e && typeof e === "object") {
      if (e.message) message = String(e.message);
      if (e.code === "23505") message = "Slug sudah digunakan. Pilih slug lain.";
    }
    console.error("Create client error:", JSON.stringify(err));
    return NextResponse.json(
      { data: null, error: message },
      { status: 500 }
    );
  }
}
