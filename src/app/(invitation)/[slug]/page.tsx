import { getTenantBySlug, getWishesByTenant, getPhotosByTenant, getGuestByCode } from "@/lib/supabase/queries";
import { InvitationWrapper } from "@/components/invitation/InvitationWrapper";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export default async function InvitationPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { to } = await searchParams;

  const tenant = await getTenantBySlug(slug);

  if (!tenant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-cream px-4 text-center">
        <h1 className="font-display text-4xl text-wedding-charcoal mb-3">Undangan Tidak Ditemukan</h1>
        <p className="text-wedding-charcoal/70 mb-6">Undangan yang Anda cari tidak tersedia atau alamatnya salah.</p>
        <Link href="/" className="text-wedding-rose underline underline-offset-4">Kembali ke Beranda</Link>
      </div>
    );
  }

  if (!tenant.is_active) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-cream px-4 text-center">
        <h1 className="font-display text-4xl text-wedding-charcoal mb-3">Undangan Tidak Aktif</h1>
        <p className="text-wedding-charcoal/70">Undangan ini sudah tidak aktif. Terima kasih.</p>
      </div>
    );
  }

  const now = new Date();
  if (tenant.expires_at && new Date(tenant.expires_at) < now) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-cream px-4 text-center">
        <h1 className="font-display text-4xl text-wedding-charcoal mb-3">Acara Telah Berlangsung</h1>
        <p className="text-wedding-charcoal/70 mb-2">
          Pernikahan {tenant.groom_name} & {tenant.bride_name} telah berlangsung.
        </p>
        <p className="text-wedding-charcoal/70">Terima kasih atas doa dan ucapannya.</p>
      </div>
    );
  }

  let photos: { id: string; url: string; caption?: string; sort_order: number }[] = [];
  let wishes: { id: string; name: string; message: string; created_at: string }[] = [];
  let guestName: string | undefined;

  try {
    photos = (await getPhotosByTenant(tenant.id)) as unknown as typeof photos;
  } catch {}
  try {
    wishes = (await getWishesByTenant(tenant.id, true)) as unknown as typeof wishes;
  } catch {}

  if (to) {
    try {
      const guest = await getGuestByCode(to);
      if (guest) guestName = guest.name;
    } catch {}
    if (!guestName) guestName = decodeURIComponent(to);
  }

  const theme = tenant.theme || null;

  return (
    <InvitationWrapper
      tenant={tenant}
      photos={photos}
      wishes={wishes}
      theme={theme}
      guestName={guestName}
    />
  );
}
