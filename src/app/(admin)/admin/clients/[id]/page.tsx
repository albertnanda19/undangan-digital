import Link from "next/link";
import { notFound } from "next/navigation";
import { Edit2, ExternalLink, Copy, Users, CheckSquare, MessageSquare, Banknote } from "lucide-react";
import { getTenantById, getClientStats, getRSVPByTenant, getGuestsByTenant } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/admin/StatsCard";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate, formatTime } from "@/lib/utils";
import { ClientDetailTabs } from "@/components/admin/ClientDetailTabs";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let tenant: Record<string, unknown> | null = null;
  let stats = { totalGuests: 0, totalRSVP: 0, totalHadir: 0, totalTidakHadir: 0, totalMungkin: 0, totalWishes: 0, totalAmplopConfirmed: 0, tenantId: id };
  let rsvpList: Record<string, unknown>[] = [];
  let guests: Record<string, unknown>[] = [];

  try {
    tenant = await getTenantById(id) as unknown as Record<string, unknown>;
    stats = await getClientStats(id);
    rsvpList = (await getRSVPByTenant(id)) as unknown as Record<string, unknown>[];
    guests = (await getGuestsByTenant(id)) as unknown as Record<string, unknown>[];
  } catch {
    notFound();
  }
  if (!tenant) notFound();

  const invitationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${tenant.slug}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#E2E8F0]">
              {tenant.groom_name as string} & {tenant.bride_name as string}
            </h1>
            <Badge variant={tenant.is_active ? "success" : "secondary"}>
              {tenant.is_active ? "Aktif" : "Nonaktif"}
            </Badge>
          </div>
          <p className="text-sm text-[#94A3B8] mt-1">/{tenant.slug as string}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link href={`/admin/clients/${id}/edit`}>
            <Button variant="outline" size="sm"><Edit2 className="h-4 w-4 mr-2" /> Edit</Button>
          </Link>
          <Link href={`/${tenant.slug}`} target="_blank">
            <Button variant="outline" size="sm"><ExternalLink className="h-4 w-4 mr-2" /> Lihat Undangan</Button>
          </Link>
          <Button variant="outline" size="sm"><Copy className="h-4 w-4 mr-2" /> Salin Link</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Users} label="Total Tamu" value={stats.totalGuests} color="blue" />
        <StatsCard icon={CheckSquare} label="RSVP Hadir" value={stats.totalHadir} color="green" />
        <StatsCard icon={MessageSquare} label="Total Ucapan" value={stats.totalWishes} color="purple" />
        <StatsCard icon={Banknote} label="Konfirmasi Amplop" value={stats.totalAmplopConfirmed} color="yellow" />
      </div>

      {/* Tabs */}
      <ClientDetailTabs
        tenantId={id}
        tenant={tenant}
        stats={stats}
        rsvpList={rsvpList}
        guests={guests}
        invitationUrl={invitationUrl}
      />
    </div>
  );
}
