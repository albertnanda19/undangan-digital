import Link from "next/link";
import { Users, AlertCircle, CheckSquare, MessageSquare, Plus, ArrowRight, ExternalLink } from "lucide-react";
import { getDashboardStats } from "@/lib/supabase/queries";
import { StatsCard } from "@/components/admin/StatsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  let stats: {
    totalActiveClients: number;
    totalClientsExpiringSoon: number;
    totalRSVPToday: number;
    totalPendingWishes: number;
    recentClients: { id: string; slug: string; groom_name?: string; bride_name?: string; akad_date?: string; is_active?: boolean }[];
    monthlyStats: { month: string; count: number }[];
  } = {
    totalActiveClients: 0,
    totalClientsExpiringSoon: 0,
    totalRSVPToday: 0,
    totalPendingWishes: 0,
    recentClients: [],
    monthlyStats: [],
  };

  try {
    stats = await getDashboardStats();
  } catch {
    // Stats will remain at default 0 values if DB not connected
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#E2E8F0]">Dashboard</h1>
        <p className="text-sm text-[#94A3B8] mt-1">Ringkasan platform undangan digital Anda</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={Users} label="Klien Aktif" value={stats.totalActiveClients} color="blue" />
        <StatsCard icon={AlertCircle} label="Kadaluarsa < 30 Hari" value={stats.totalClientsExpiringSoon} color="yellow" />
        <StatsCard icon={CheckSquare} label="RSVP Hari Ini" value={stats.totalRSVPToday} color="green" />
        <StatsCard icon={MessageSquare} label="Ucapan Menunggu" value={stats.totalPendingWishes} color="purple" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/clients/new">
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5 hover:border-[#6C63FF] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C63FF]/10">
                <Plus className="h-5 w-5 text-[#6C63FF]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#E2E8F0]">Tambah Klien Baru</p>
                <p className="text-xs text-[#94A3B8]">Buat undangan baru</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/admin/clients">
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5 hover:border-[#6C63FF] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#E2E8F0]">Lihat Semua Klien</p>
                <p className="text-xs text-[#94A3B8]">Kelola undangan</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/admin/wishes">
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5 hover:border-[#6C63FF] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <MessageSquare className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#E2E8F0]">Moderasi Ucapan</p>
                <p className="text-xs text-[#94A3B8]">{stats.totalPendingWishes} menunggu</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Clients Table */}
      <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27]">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-[#E2E8F0]">Klien Terbaru</h2>
          <Link href="/admin/clients" className="flex items-center gap-1 text-sm text-[#6C63FF] hover:underline">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {stats.recentClients.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Pasangan</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tanggal Nikah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.groom_name} & {client.bride_name}
                  </TableCell>
                  <TableCell className="text-[#94A3B8]">/{client.slug}</TableCell>
                  <TableCell className="text-[#94A3B8]">
                    {client.akad_date ? formatDate(client.akad_date, "d MMM yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.is_active ? "success" : "secondary"}>
                      {client.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/clients/${client.id}`}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-6 pt-0 text-center">
            <p className="text-[#94A3B8] text-sm">Belum ada klien. Mulai dengan menambahkan klien pertama.</p>
            <Link href="/admin/clients/new">
              <Button className="mt-4" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Tambah Klien Pertama
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
