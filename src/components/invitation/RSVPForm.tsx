"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  tenantId: string;
  guestName?: string;
  themeConfig: Record<string, string>;
}

export function RSVPForm({ tenantId, guestName, themeConfig }: Props) {
  const [name, setName] = useState(guestName || "");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "mungkin">("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [eventType, setEventType] = useState<"akad" | "resepsi" | "keduanya">("keduanya");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/invitation/rsvp", {
        tenantId,
        name,
        phone: phone || undefined,
        attendance,
        guestCount: attendance === "hadir" ? guestCount : 0,
        eventType,
        message: message || undefined,
        website: honeypot,
      });
      setSubmitted(true);
    } catch {
      setError("Gagal mengirim konfirmasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-display text-2xl mb-2" style={{ color: themeConfig.textColor }}>Terima Kasih!</h3>
        <p className="text-sm opacity-70" style={{ color: themeConfig.textColor }}>
          Konfirmasi kehadiran Anda telah kami terima.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: themeConfig.textColor }}>Nama</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors"
          style={{ borderColor: themeConfig.primaryColor + "40", backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}
          placeholder="Nama lengkap Anda"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: themeConfig.textColor }}>No. WhatsApp (opsional)</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
          style={{ borderColor: themeConfig.primaryColor + "40", backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}
          placeholder="08xxxxxxxxxx"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: themeConfig.textColor }}>Kehadiran</label>
        <div className="grid grid-cols-3 gap-2">
          {([["hadir", "Hadir"], ["tidak_hadir", "Tidak Hadir"], ["mungkin", "Belum Pasti"]] as const).map(([val, lbl]) => (
            <button
              key={val}
              type="button"
              onClick={() => setAttendance(val)}
              className="rounded-lg border px-3 py-2 text-xs font-medium transition-all"
              style={{
                borderColor: attendance === val ? themeConfig.primaryColor : themeConfig.primaryColor + "40",
                backgroundColor: attendance === val ? themeConfig.primaryColor : "transparent",
                color: attendance === val ? "#fff" : themeConfig.textColor,
              }}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {attendance === "hadir" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: themeConfig.textColor }}>Jumlah Tamu</label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
              style={{ borderColor: themeConfig.primaryColor + "40", backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} orang</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: themeConfig.textColor }}>Acara</label>
            <div className="grid grid-cols-3 gap-2">
              {([["akad", "Akad"], ["resepsi", "Resepsi"], ["keduanya", "Keduanya"]] as const).map(([val, lbl]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setEventType(val)}
                  className="rounded-lg border px-3 py-2 text-xs font-medium transition-all"
                  style={{
                    borderColor: eventType === val ? themeConfig.primaryColor : themeConfig.primaryColor + "40",
                    backgroundColor: eventType === val ? themeConfig.primaryColor : "transparent",
                    color: eventType === val ? "#fff" : themeConfig.textColor,
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: themeConfig.textColor }}>Pesan (opsional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none resize-none"
          style={{ borderColor: themeConfig.primaryColor + "40", backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}
          placeholder="Pesan untuk mempelai..."
        />
      </div>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: themeConfig.primaryColor }}
      >
        {loading ? "Mengirim..." : "Kirim Konfirmasi"}
      </button>
    </form>
  );
}
