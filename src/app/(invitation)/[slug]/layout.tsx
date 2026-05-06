import type { Metadata } from "next";
import { getTenantBySlug } from "@/lib/supabase/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getTenantBySlug(slug);
  if (!tenant) return { title: "Undangan tidak ditemukan" };

  return {
    title: `Undangan Pernikahan ${tenant.groom_name} & ${tenant.bride_name}`,
    description: `Kami mengundang Anda untuk menyaksikan momen bahagia pernikahan ${tenant.groom_name} & ${tenant.bride_name}`,
    openGraph: {
      title: `${tenant.groom_name} & ${tenant.bride_name} — Undangan Pernikahan`,
      description: `Kami mengundang Anda untuk hadir di hari bahagia kami`,
      images: tenant.cover_photo_url ? [{ url: tenant.cover_photo_url, width: 1200, height: 630 }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tenant.groom_name} & ${tenant.bride_name}`,
      images: tenant.cover_photo_url ? [tenant.cover_photo_url] : [],
    },
  };
}

export default function InvitationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
