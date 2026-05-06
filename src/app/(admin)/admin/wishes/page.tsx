"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Trash2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface WishItem {
  id: string;
  name: string;
  message: string;
  is_approved: boolean;
  created_at: string;
  tenant_id: string;
  tenant_name?: string;
}

export default function WishesPage() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishes = async () => {
    try {
      const res = await axios.get("/api/admin/wishes");
      setWishes(res.data.data || []);
    } catch {
      toast.error("Gagal memuat ucapan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWishes(); }, []);

  const handleApprove = async (id: string) => {
    try {
      await axios.patch("/api/admin/wishes", { id, action: "approve" });
      setWishes(wishes.map((w) => (w.id === id ? { ...w, is_approved: true } : w)));
      toast.success("Ucapan disetujui");
    } catch {
      toast.error("Gagal menyetujui ucapan");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/admin/wishes?id=${id}`);
      setWishes(wishes.filter((w) => w.id !== id));
      toast.success("Ucapan dihapus");
    } catch {
      toast.error("Gagal menghapus ucapan");
    }
  };

  const pendingCount = wishes.filter((w) => !w.is_approved).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#E2E8F0]">Moderasi Ucapan</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-[#2A2D3E]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#E2E8F0]">Moderasi Ucapan</h1>
          {pendingCount > 0 && (
            <Badge variant="destructive">{pendingCount} menunggu</Badge>
          )}
        </div>
      </div>

      {wishes.length > 0 ? (
        <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead className="max-w-[300px]">Ucapan</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishes.map((wish) => (
                <TableRow key={wish.id}>
                  <TableCell className="font-medium">{wish.name}</TableCell>
                  <TableCell className="max-w-[300px] truncate text-[#94A3B8]">{wish.message}</TableCell>
                  <TableCell className="text-[#94A3B8] text-xs whitespace-nowrap">
                    {new Date(wish.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={wish.is_approved ? "success" : "warning"}>
                      {wish.is_approved ? "Disetujui" : "Menunggu"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {!wish.is_approved && (
                        <Button variant="ghost" size="icon" onClick={() => handleApprove(wish.id)} title="Setujui">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(wish.id)} title="Hapus">
                        <Trash2 className="h-4 w-4 text-red-400" />
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
            <MessageSquare className="h-8 w-8 text-[#94A3B8]" />
          </div>
          <h3 className="text-lg font-medium text-[#E2E8F0]">Belum ada ucapan</h3>
          <p className="text-sm text-[#94A3B8] mt-2">Ucapan dari tamu akan muncul di sini.</p>
        </div>
      )}
    </div>
  );
}
