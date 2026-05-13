"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserPlus,
  Copy,
  Check,
  Trash2,
  MessageCircle,
  Search,
  ChevronDown,
  Users,
  Crown,
  RefreshCw,
  X,
  Phone,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import type { Guest, GuestCategory } from "@/types";

const CATEGORY_LABELS: Record<GuestCategory, string> = {
  family: "Keluarga",
  friend: "Teman",
  colleague: "Rekan Kerja",
  other: "Lainnya",
};

const CATEGORY_COLORS: Record<GuestCategory, string> = {
  family: "bg-rose-500/20 text-rose-400",
  friend: "bg-blue-500/20 text-blue-400",
  colleague: "bg-purple-500/20 text-purple-400",
  other: "bg-gray-500/20 text-gray-400",
};

function buildInvitationUrl(baseUrl: string, slug: string, guestName: string): string {
  return `${baseUrl}/${slug}?to=${encodeURIComponent(guestName)}`;
}

function buildWhatsAppMessage(params: {
  guestName: string;
  groomName: string;
  brideName: string;
  receptionDate: string;
  receptionVenueName: string;
  invitationUrl: string;
}): string {
  const date = new Date(params.receptionDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `Assalamu'alaikum Wr. Wb.

Kepada Yth.
*${params.guestName}*

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:

*${params.groomName}* & *${params.brideName}*
📅 ${date}
📍 ${params.receptionVenueName}

Informasi lengkap & konfirmasi kehadiran:
👇 ${params.invitationUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Wassalamu'alaikum Wr. Wb.`;
}

type AddGuestFormProps = {
  tenantId: string;
  onSuccess: (guest: Guest) => void;
  onCancel: () => void;
};

function AddGuestForm({ tenantId, onSuccess, onCancel }: AddGuestFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: "friend" as GuestCategory,
    isVip: false,
    seatNumber: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }
    if (form.phone && !/^[0-9+\-\s()]{8,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Format nomor HP tidak valid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/clients/${tenantId}/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim() || undefined,
          category: form.category,
          isVip: form.isVip,
          seatNumber: form.seatNumber.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Gagal menambah tamu");

      toast.success(`Tamu "${form.name}" berhasil ditambahkan`);
      onSuccess(result.data);
      setForm({ name: "", phone: "", category: "friend", isVip: false, seatNumber: "", notes: "" });
      setErrors({});
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menambah tamu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1D27] border border-[#6C63FF]/40 rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#E2E8F0] font-semibold flex items-center gap-2">
          <UserPlus size={16} className="text-[#6C63FF]" />
          Tambah Tamu Baru
        </h3>
        <button onClick={onCancel} className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Nama Tamu <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Contoh: Bapak Ahmad Rizal"
              autoFocus
              className={`w-full h-10 rounded-lg border bg-[#0F1117] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#475569] transition-colors focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#2A2D3E] focus:border-[#6C63FF] focus:ring-[#6C63FF]"
              }`}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Nomor WhatsApp <span className="text-[#475569]">(opsional)</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Contoh: 08123456789"
              className={`w-full h-10 rounded-lg border bg-[#0F1117] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#475569] transition-colors focus:outline-none focus:ring-1 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#2A2D3E] focus:border-[#6C63FF] focus:ring-[#6C63FF]"
              }`}
            />
            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as GuestCategory })}
              className="w-full h-10 rounded-lg border border-[#2A2D3E] bg-[#0F1117] px-3 py-2 text-sm text-[#E2E8F0] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]"
            >
              <option value="family">Keluarga</option>
              <option value="friend">Teman</option>
              <option value="colleague">Rekan Kerja</option>
              <option value="other">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Nomor Meja <span className="text-[#475569]">(opsional)</span>
            </label>
            <input
              type="text"
              value={form.seatNumber}
              onChange={(e) => setForm({ ...form, seatNumber: e.target.value })}
              placeholder="Contoh: Meja 5"
              className="w-full h-10 rounded-lg border border-[#2A2D3E] bg-[#0F1117] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#475569] transition-colors focus:outline-none focus:ring-1 focus:border-[#6C63FF] focus:ring-[#6C63FF]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, isVip: !form.isVip })}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                form.isVip ? "bg-[#6C63FF]" : "bg-[#2A2D3E]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.isVip ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div>
              <p className="text-sm text-[#E2E8F0]">Tamu VIP</p>
              <p className="text-xs text-[#475569]">Ditandai dengan mahkota</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Catatan <span className="text-[#475569]">(opsional)</span>
            </label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Contoh: Bawa undangan fisik, teman SMA..."
              className="w-full h-10 rounded-lg border border-[#2A2D3E] bg-[#0F1117] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#475569] transition-colors focus:outline-none focus:ring-1 focus:border-[#6C63FF] focus:ring-[#6C63FF]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#6C63FF] hover:bg-[#5A52E0] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <UserPlus size={15} />
                Simpan Tamu
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-[#2A2D3E] hover:bg-[#2A2D3E] text-[#94A3B8] hover:text-[#E2E8F0] text-sm font-medium rounded-lg transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    toast.success("Link berhasil disalin!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      title={url}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-[#6C63FF]/15 hover:bg-[#6C63FF]/25 text-[#6C63FF] border border-[#6C63FF]/20"
      }`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Tersalin!" : "Salin Link"}
    </button>
  );
}

function WhatsAppButton({
  phone,
  message,
  guestName,
}: {
  phone?: string;
  message: string;
  guestName: string;
}) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    if (phone) {
      const cleanPhone = phone.replace(/[\s\-()]/g, "");
      const waPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone;
      window.open(`https://wa.me/${waPhone}?text=${encodedMessage}`, "_blank");
    } else {
      navigator.clipboard.writeText(message).then(() => {
        toast.success(`Pesan untuk ${guestName} berhasil disalin!`);
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      title={phone ? `Buka WhatsApp untuk ${guestName}` : `Salin pesan untuk ${guestName}`}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/20 transition-all"
    >
      <MessageCircle size={12} />
      {phone ? "WhatsApp" : "Salin Pesan"}
    </button>
  );
}

function PreviewLinkModal({
  guest,
  invitationUrl,
  whatsappMessage,
  onClose,
}: {
  guest: Guest;
  invitationUrl: string;
  whatsappMessage: string;
  onClose: () => void;
}) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(invitationUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
    toast.success("Link berhasil disalin!");
  };

  const copyMsg = async () => {
    await navigator.clipboard.writeText(whatsappMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
    toast.success("Pesan WhatsApp berhasil disalin!");
  };

  const waHref = guest.phone
    ? `https://wa.me/${
        guest.phone.replace(/[\s\-()]/g, "").startsWith("0")
          ? "62" + guest.phone.replace(/[\s\-()]/g, "").slice(1)
          : guest.phone.replace(/[\s\-()]/g, "")
      }?text=${encodeURIComponent(whatsappMessage)}`
    : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="bg-[#1A1D27] border border-[#2A2D3E] rounded-2xl p-6 w-full max-w-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[#E2E8F0] font-semibold text-lg">{guest.name}</h3>
            <p className="text-[#94A3B8] text-sm">Detail link undangan personal</p>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <div className="mb-5">
          <label className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 block">
            Link Undangan Personal
          </label>
          <div className="bg-[#0F1117] rounded-xl p-3 border border-[#2A2D3E]">
            <p className="text-[#6C63FF] text-sm break-all font-mono mb-3">{invitationUrl}</p>
            <div className="flex gap-2">
              <button
                onClick={copyUrl}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copiedUrl
                    ? "bg-green-500/20 text-green-400"
                    : "bg-[#6C63FF]/20 hover:bg-[#6C63FF]/30 text-[#6C63FF]"
                }`}
              >
                {copiedUrl ? <Check size={14} /> : <Copy size={14} />}
                {copiedUrl ? "Tersalin!" : "Salin Link"}
              </button>
              <a
                href={invitationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#2A2D3E] hover:bg-[#3A3D5E] text-[#E2E8F0] transition-all"
              >
                <ExternalLink size={14} />
                Preview
              </a>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2 block">
            Pesan WhatsApp Siap Kirim
          </label>
          <div className="bg-[#0F1117] rounded-xl p-3 border border-[#2A2D3E]">
            <pre className="text-[#E2E8F0] text-xs whitespace-pre-wrap font-sans leading-relaxed max-h-52 overflow-y-auto">
              {whatsappMessage}
            </pre>
            <div className="flex gap-2 mt-3">
              <button
                onClick={copyMsg}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copiedMsg
                    ? "bg-green-500/20 text-green-400"
                    : "bg-green-500/15 hover:bg-green-500/25 text-green-400 border border-green-500/20"
                }`}
              >
                {copiedMsg ? <Check size={14} /> : <Copy size={14} />}
                {copiedMsg ? "Tersalin!" : "Salin Pesan"}
              </button>
              {waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-all"
                >
                  <MessageCircle size={14} />
                  Buka WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type GuestManagerProps = {
  tenantId: string;
  tenantSlug: string;
  groomName: string;
  brideName: string;
  receptionDate: string;
  receptionVenueName: string;
  appUrl?: string;
};

export function GuestManager({
  tenantId,
  tenantSlug,
  groomName,
  brideName,
  receptionDate,
  receptionVenueName,
  appUrl,
}: GuestManagerProps) {
  const baseUrl =
    appUrl ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<GuestCategory | "">("");
  const [totalGuests, setTotalGuests] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchGuests = useCallback(
    async (showRefreshing = false) => {
      if (showRefreshing) setIsRefreshing(true);
      else setIsLoading(true);

      try {
        const params = new URLSearchParams({ pageSize: "100" });
        if (searchQuery) params.set("search", searchQuery);
        if (categoryFilter) params.set("category", categoryFilter);

        const response = await fetch(`/api/admin/clients/${tenantId}/guests?${params}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);

        setGuests(result.data || []);
        setTotalGuests(result.total || 0);
      } catch {
        toast.error("Gagal memuat daftar tamu");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [tenantId, searchQuery, categoryFilter]
  );

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  const handleGuestAdded = (newGuest: Guest) => {
    setGuests((prev) => [newGuest, ...prev]);
    setTotalGuests((prev) => prev + 1);
  };

  const handleDeleteGuest = async (guestId: string, guestName: string) => {
    if (!confirm(`Hapus tamu "${guestName}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    setDeletingId(guestId);
    try {
      const response = await fetch(`/api/admin/clients/${tenantId}/guests/${guestId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }
      setGuests((prev) => prev.filter((g) => g.id !== guestId));
      setTotalGuests((prev) => prev - 1);
      toast.success(`Tamu "${guestName}" berhasil dihapus`);
    } catch {
      toast.error("Gagal menghapus tamu");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = {
    total: guests.length,
    vip: guests.filter((g) => g.isVip).length,
    family: guests.filter((g) => g.category === "family").length,
    friend: guests.filter((g) => g.category === "friend").length,
  };

  const selectedGuestUrl = selectedGuest
    ? buildInvitationUrl(baseUrl, tenantSlug, selectedGuest.name)
    : "";
  const selectedGuestWhatsApp = selectedGuest
    ? buildWhatsAppMessage({
        guestName: selectedGuest.name,
        groomName,
        brideName,
        receptionDate,
        receptionVenueName,
        invitationUrl: selectedGuestUrl,
      })
    : "";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#E2E8F0] flex items-center gap-2">
            <Users size={20} className="text-[#6C63FF]" />
            Kelola Tamu Undangan
          </h2>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            {totalGuests > 0
              ? `${totalGuests} tamu terdaftar`
              : "Belum ada tamu — tambahkan sekarang"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchGuests(true)}
            disabled={isRefreshing}
            className="p-2 rounded-lg border border-[#2A2D3E] hover:bg-[#2A2D3E] text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6C63FF] hover:bg-[#5A52E0] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <UserPlus size={15} />
            Tambah Tamu
          </button>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Tamu", value: stats.total, color: "text-[#6C63FF]" },
            { label: "Tamu VIP", value: stats.vip, color: "text-yellow-400" },
            { label: "Keluarga", value: stats.family, color: "text-rose-400" },
            { label: "Teman", value: stats.friend, color: "text-blue-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1A1D27] border border-[#2A2D3E] rounded-xl p-3 text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {showAddForm && (
        <AddGuestForm
          tenantId={tenantId}
          onSuccess={handleGuestAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {totalGuests > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau nomor HP..."
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-[#2A2D3E] bg-[#1A1D27] text-sm text-[#E2E8F0] placeholder:text-[#475569] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#E2E8F0]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as GuestCategory | "")}
              className="h-10 pl-3 pr-8 rounded-lg border border-[#2A2D3E] bg-[#1A1D27] text-sm text-[#E2E8F0] focus:border-[#6C63FF] focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">Semua Kategori</option>
              <option value="family">Keluarga</option>
              <option value="friend">Teman</option>
              <option value="colleague">Rekan Kerja</option>
              <option value="other">Lainnya</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none"
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-[#1A1D27] border border-[#2A2D3E] animate-pulse" />
          ))}
        </div>
      ) : guests.length === 0 ? (
        <div className="text-center py-16 bg-[#1A1D27] border border-[#2A2D3E] rounded-xl">
          <div className="text-5xl mb-4">👥</div>
          <p className="text-[#E2E8F0] font-semibold mb-1">
            {searchQuery || categoryFilter ? "Tamu tidak ditemukan" : "Belum ada tamu"}
          </p>
          <p className="text-[#94A3B8] text-sm mb-5">
            {searchQuery || categoryFilter
              ? "Coba ubah kata kunci pencarian atau filter"
              : "Tambahkan tamu untuk membuat link undangan personal"}
          </p>
          {!searchQuery && !categoryFilter && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#6C63FF] hover:bg-[#5A52E0] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <UserPlus size={15} />
              Tambah Tamu Pertama
            </button>
          )}
        </div>
      ) : (
        <div className="bg-[#1A1D27] border border-[#2A2D3E] rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-[#2A2D3E] bg-[#0F1117]">
            <div className="col-span-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              Nama Tamu
            </div>
            <div className="col-span-2 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden md:block">
              Kategori
            </div>
            <div className="col-span-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider hidden md:block">
              Nomor HP
            </div>
            <div className="col-span-8 md:col-span-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider text-right">
              Aksi
            </div>
          </div>

          <div className="divide-y divide-[#2A2D3E]">
            {guests.map((guest) => {
              const invUrl = buildInvitationUrl(baseUrl, tenantSlug, guest.name);
              const waMsg = buildWhatsAppMessage({
                guestName: guest.name,
                groomName,
                brideName,
                receptionDate,
                receptionVenueName,
                invitationUrl: invUrl,
              });

              return (
                <div
                  key={guest.id}
                  className="grid grid-cols-12 gap-3 px-4 py-4 items-center hover:bg-[#2A2D3E]/30 transition-colors group"
                >
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      {guest.isVip && <Crown size={14} className="text-yellow-400 flex-shrink-0" />}
                      <div>
                        <p className="text-sm font-semibold text-[#E2E8F0] truncate">{guest.name}</p>
                        {guest.seatNumber && (
                          <p className="text-xs text-[#475569]">📍 {guest.seatNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 hidden md:block">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        CATEGORY_COLORS[guest.category as GuestCategory]
                      }`}
                    >
                      {CATEGORY_LABELS[guest.category as GuestCategory]}
                    </span>
                  </div>

                  <div className="col-span-3 hidden md:block">
                    {guest.phone ? (
                      <p className="text-sm text-[#94A3B8] flex items-center gap-1.5">
                        <Phone size={12} />
                        {guest.phone}
                      </p>
                    ) : (
                      <p className="text-xs text-[#475569] italic">Tidak ada</p>
                    )}
                  </div>

                  <div className="col-span-8 md:col-span-3 flex items-center justify-end gap-2 flex-wrap">
                    <CopyLinkButton url={invUrl} />
                    <WhatsAppButton phone={guest.phone} message={waMsg} guestName={guest.name} />
                    <button
                      onClick={() => setSelectedGuest(guest)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2A2D3E] hover:bg-[#3A3D5E] text-[#94A3B8] hover:text-[#E2E8F0] border border-[#2A2D3E] transition-all"
                      title="Lihat semua detail & link"
                    >
                      <ExternalLink size={12} />
                      Detail
                    </button>
                    <button
                      onClick={() => handleDeleteGuest(guest.id, guest.name)}
                      disabled={deletingId === guest.id}
                      className="p-1.5 rounded-lg text-[#475569] hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                      title="Hapus tamu"
                    >
                      {deletingId === guest.id ? (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalGuests > guests.length && (
            <div className="px-4 py-3 border-t border-[#2A2D3E] text-center">
              <p className="text-xs text-[#475569]">
                Menampilkan {guests.length} dari {totalGuests} tamu
              </p>
            </div>
          )}
        </div>
      )}

      {selectedGuest && (
        <PreviewLinkModal
          guest={selectedGuest}
          invitationUrl={selectedGuestUrl}
          whatsappMessage={selectedGuestWhatsApp}
          onClose={() => setSelectedGuest(null)}
        />
      )}
    </div>
  );
}
