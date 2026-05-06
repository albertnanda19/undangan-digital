"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4 font-admin">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C63FF]/20 mb-4">
            <Heart className="h-6 w-6 text-[#6C63FF]" />
          </div>
          <h1 className="text-xl font-semibold text-[#E2E8F0]">Admin Login</h1>
          <p className="text-sm text-[#94A3B8] mt-1">Undangan Digital Platform</p>
        </div>

        <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Masuk
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-[#475569] mt-6">
          Hanya administrator yang dapat mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}
