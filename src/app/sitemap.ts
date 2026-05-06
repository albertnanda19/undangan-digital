import { MetadataRoute } from "next";
import { getAllTenants } from "@/lib/supabase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let invitationUrls: MetadataRoute.Sitemap = [];

  try {
    const tenants = await getAllTenants();
    invitationUrls = tenants
      .filter((t: { is_active?: boolean }) => t.is_active)
      .map((t: { slug: string; updated_at?: string }) => ({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/${t.slug}`,
        lastModified: t.updated_at ? new Date(t.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch {
    // DB not connected
  }

  return [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      lastModified: new Date(),
      priority: 1,
    },
    ...invitationUrls,
  ];
}
