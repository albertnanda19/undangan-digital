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
      religion: body.religion || "islam",
      groomBirthOrder: body.groomBirthOrder || null,
      brideBirthOrder: body.brideBirthOrder || null,
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
      timeZone: body.timeZone || "WIB",
      themeId: body.themeId || null,
      isPasswordProtected: body.isPasswordProtected || false,
      showAmplopDigital: body.showAmplopDigital || false,
      showGiftAddress: body.showGiftAddress || false,
      showQris: body.showQris || false,
      giftAddress: body.giftAddress || null,
      giftNotes: body.giftNotes || null,
      qrisImageUrl: body.qrisImageUrl || null,
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
      lottieAutoSelect: body.lottieAutoSelect !== false,
    };

    const tenant = await updateTenant(id, tenantData);
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
