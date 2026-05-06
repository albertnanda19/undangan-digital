import Link from "next/link";
import { Plus, ExternalLink, Edit2, ToggleLeft } from "lucide-react";
import { getAllTenants } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

export default async function ClientsPage() {
  let clients: { id: string; slug: string; groom_name?: string; bride_name?: string; akad_date?: string; is_active?: boolean; theme?: { name?: string } | null; created_at?: string }[] = [];

  try {
    clients = await getAllTenants();
  } catch {
    // Empty state if DB not connected
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#E2E8F0]">Daftar Klien</h1>
          <p className="text-sm text-[#94A3B8] mt-1">{clients.length} klien terdaftar</p>
        </div>
        <Link href="/admin/clients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Tambah Klien Baru
          </Button>
        </Link>
      </div>

      {clients.length > 0 ? (
        <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">No.</TableHead>
                <TableHead>Nama Pasangan</TableHead>
                <TableHead>URL Slug</TableHead>
                <TableHead>Tema</TableHead>
                <TableHead>Tanggal Nikah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client, i) => (
                <TableRow key={client.id}>
                  <TableCell className="text-[#94A3B8]">{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    {client.groom_name} & {client.bride_name}
                  </TableCell>
                  <TableCell className="text-[#94A3B8] font-mono text-xs">/{client.slug}</TableCell>
                  <TableCell className="text-[#94A3B8]">{client.theme?.name || "-"}</TableCell>
                  <TableCell className="text-[#94A3B8]">
                    {client.akad_date ? formatDate(client.akad_date, "d MMM yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.is_active ? "success" : "secondary"}>
                      {client.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#94A3B8] text-xs">
                    {client.created_at ? formatDate(client.created_at, "d MMM yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/clients/${client.id}`}>
                        <Button variant="ghost" size="icon" title="Lihat Detail">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/clients/${client.id}/edit`}>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" title="Nonaktifkan">
                        <ToggleLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#2A2D3E] flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-lg font-medium text-[#E2E8F0]">Belum ada klien</h3>
          <p className="text-sm text-[#94A3B8] mt-2 max-w-sm mx-auto">
            Mulai dengan menambahkan klien pertama. Setiap klien akan mendapatkan halaman undangan digital yang unik.
          </p>
          <Link href="/admin/clients/new">
            <Button className="mt-6">
              <Plus className="h-4 w-4 mr-2" /> Tambah Klien Pertama
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
