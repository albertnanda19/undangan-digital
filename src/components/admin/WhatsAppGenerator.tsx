"use client";

import { useState } from "react";
import { MessageCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";

interface Props {
  groomName: string;
  brideName: string;
  receptionDate: string;
  receptionVenueName: string;
  slug: string;
  guests?: { name: string; phone?: string; invitationCode: string }[];
}

export function WhatsAppGenerator({ groomName, brideName, receptionDate, receptionVenueName, slug, guests = [] }: Props) {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://undangan.digital";

  const generateMessage = (name: string, code?: string) => {
    const link = code ? `${appUrl}/${slug}?to=${code}` : `${appUrl}/${slug}?to=${encodeURIComponent(name)}`;
    return `Assalamu'alaikum Wr. Wb.\n\nKepada Yth.\n*${name}*\n\nDengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:\n\n*${groomName}* & *${brideName}*\n📅 ${formatDate(receptionDate)}\n📍 ${receptionVenueName}\n\nInformasi lengkap dan konfirmasi kehadiran:\n👇 ${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nWassalamu'alaikum Wr. Wb.`;
  };

  const message = generateMessage(guestName || "Bapak/Ibu/Saudara/i");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWA = () => {
    const phone = guestPhone.replace(/^0/, "62").replace(/\D/g, "");
    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-[#E2E8F0]">Generator Pesan WhatsApp</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          {guests.length > 0 && (
            <div>
              <label className="text-xs text-[#94A3B8] mb-1 block">Pilih Tamu</label>
              <select
                className="w-full rounded-md border border-[#2A2D3E] bg-[#1A1D27] px-3 py-2 text-sm text-[#E2E8F0]"
                onChange={(e) => {
                  const g = guests.find((x) => x.name === e.target.value);
                  if (g) { setGuestName(g.name); setGuestPhone(g.phone || ""); }
                }}
                defaultValue=""
              >
                <option value="">-- Pilih dari daftar --</option>
                {guests.map((g) => (
                  <option key={g.invitationCode} value={g.name}>{g.name}</option>
                ))}
              </select>
            </div>
          )}
          <Input
            label="Nama Tamu"
            placeholder="Nama lengkap tamu"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <Input
            label="Nomor HP (opsional)"
            placeholder="08xxxxxxxxxx"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleOpenWA} className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" /> Buka WhatsApp
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-xs text-[#94A3B8] mb-1 block">Preview Pesan</label>
          <Textarea
            value={message}
            readOnly
            className="h-64 text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
}
