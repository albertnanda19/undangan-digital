import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { Toaster } from "sonner";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0F1117] flex font-admin">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <Header userEmail={user.email || ""} />
        <main className="flex-1 p-6 overflow-auto admin-scrollbar">
          {children}
        </main>
      </div>
      <Toaster theme="dark" position="top-right" richColors />
    </div>
  );
}
