"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Palette, MessageSquare, Settings, LogOut, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Klien", icon: Users },
  { href: "/admin/themes", label: "Tema", icon: Palette },
  { href: "/admin/wishes", label: "Ucapan", icon: MessageSquare },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[#2A2D3E] bg-[#1A1D27]">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#2A2D3E]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C63FF]/20">
          <Heart className="h-5 w-5 text-[#6C63FF]" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-[#E2E8F0]">Undangan Digital</h1>
          <p className="text-xs text-[#94A3B8]">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#6C63FF]/20 text-[#6C63FF] border-l-[3px] border-[#6C63FF]"
                  : "text-[#94A3B8] hover:bg-[#2A2D3E] hover:text-[#E2E8F0]"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#2A2D3E] p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
