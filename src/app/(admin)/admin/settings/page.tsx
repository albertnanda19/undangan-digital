"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password baru tidak cocok");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Password berhasil diubah");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#E2E8F0]">Pengaturan</h1>
        <p className="text-sm text-[#94A3B8] mt-1">Konfigurasi platform dan akun admin</p>
      </div>

      {/* Platform Info */}
      <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#E2E8F0]">Informasi Platform</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#94A3B8]">Nama Platform</p>
            <p className="text-[#E2E8F0] font-medium">Undangan Digital</p>
          </div>
          <div>
            <p className="text-[#94A3B8]">Versi</p>
            <p className="text-[#E2E8F0] font-medium">1.0.0</p>
          </div>
          <div>
            <p className="text-[#94A3B8]">Framework</p>
            <p className="text-[#E2E8F0] font-medium">Next.js 16 + Supabase</p>
          </div>
          <div>
            <p className="text-[#94A3B8]">Hosting</p>
            <p className="text-[#E2E8F0] font-medium">Vercel (Singapore)</p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-6">
        <h2 className="text-lg font-semibold text-[#E2E8F0] mb-4">Ubah Password Admin</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Password Lama"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Input
            label="Password Baru"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
          />
          <Input
            label="Konfirmasi Password Baru"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi password baru"
            error={confirmPassword && newPassword !== confirmPassword ? "Password tidak cocok" : undefined}
          />
          <Button type="submit" loading={loading}>Ubah Password</Button>
        </form>
      </div>
    </div>
  );
}
