import { notFound } from "next/navigation";
import { getTenantById } from "@/lib/supabase/queries";
import { ClientForm } from "@/components/admin/ClientForm";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let tenant;
  try {
    tenant = await getTenantById(id);
  } catch {
    notFound();
  }
  if (!tenant) notFound();

  const initialData = {
    groomName: tenant.groom_name,
    brideName: tenant.bride_name,
    groomNickname: tenant.groom_nickname,
    brideNickname: tenant.bride_nickname,
    groomFather: tenant.groom_father,
    groomMother: tenant.groom_mother,
    brideFather: tenant.bride_father,
    brideMother: tenant.bride_mother,
    slug: tenant.slug,
    akadDate: tenant.akad_date,
    akadTimeStart: tenant.akad_time_start,
    akadTimeEnd: tenant.akad_time_end,
    akadVenueName: tenant.akad_venue_name,
    akadVenueAddress: tenant.akad_venue_address,
    akadMapsUrl: tenant.akad_maps_url || "",
    receptionDate: tenant.reception_date,
    receptionTimeStart: tenant.reception_time_start,
    receptionTimeEnd: tenant.reception_time_end,
    receptionVenueName: tenant.reception_venue_name,
    receptionVenueAddress: tenant.reception_venue_address,
    receptionMapsUrl: tenant.reception_maps_url || "",
    dresscode: tenant.dresscode || "",
    additionalNotes: tenant.additional_notes || "",
    loveStory: tenant.love_story || "",
    musicUrl: tenant.music_url || "",
    closingMessage: tenant.closing_message || "",
    themeId: tenant.theme_id || "",
    showAmplopDigital: tenant.show_amplop_digital,
    bankAccounts: tenant.bank_accounts || [],
    isPasswordProtected: tenant.is_password_protected,
    expiresAt: tenant.expires_at || "",
    lottieAnimationUrl: tenant.lottie_animation_url || "",
    lottieAnimationPosition: tenant.lottie_animation_position || undefined,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#E2E8F0]">Edit Klien</h1>
        <p className="text-sm text-[#94A3B8] mt-1">{tenant.groom_name} & {tenant.bride_name}</p>
      </div>
      <ClientForm initialData={initialData} editId={id} />
    </div>
  );
}
