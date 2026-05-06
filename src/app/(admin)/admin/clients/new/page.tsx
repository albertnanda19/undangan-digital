import { ClientForm } from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#E2E8F0]">Tambah Klien Baru</h1>
        <p className="text-sm text-[#94A3B8] mt-1">Buat undangan pernikahan digital baru</p>
      </div>
      <ClientForm />
    </div>
  );
}
