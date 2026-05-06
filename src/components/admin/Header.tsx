"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

const breadcrumbMap: Record<string, string> = {
  admin: "Dashboard",
  clients: "Klien",
  new: "Tambah Baru",
  edit: "Edit",
  themes: "Tema",
  wishes: "Ucapan",
  settings: "Pengaturan",
  login: "Login",
};

export function Header({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: breadcrumbMap[seg] || (seg.startsWith("[") ? "Detail" : seg),
    isLast: i === segments.length - 1,
  }));

  const initials = userEmail.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#2A2D3E] bg-[#1A1D27] px-6">
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-4 w-4 text-[#475569]" />}
            <span className={crumb.isLast ? "text-[#E2E8F0] font-medium" : "text-[#94A3B8]"}>
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
          <span className="text-sm text-[#94A3B8] hidden sm:inline">{userEmail}</span>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled className="text-xs text-[#94A3B8]">
            {userEmail}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
