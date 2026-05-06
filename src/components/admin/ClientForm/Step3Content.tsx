"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ClientFormData } from "@/types";

interface Step3Props {
  data: Partial<ClientFormData>;
  onChange: (data: Partial<ClientFormData>) => void;
}

export function Step3Content({ data, onChange }: Step3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#E2E8F0]">Konten & Cerita</h2>
        <p className="text-sm text-[#94A3B8] mt-1">Personalisasi konten halaman undangan</p>
      </div>

      <Textarea
        label="Love Story / Cerita Cinta"
        placeholder="Ceritakan perjalanan cinta kalian... (mendukung teks biasa)"
        value={data.loveStory || ""}
        onChange={(e) => onChange({ loveStory: e.target.value })}
        className="min-h-[200px]"
        hint="Opsional. Akan ditampilkan di bagian Love Story undangan."
      />

      <Input
        label="URL Musik Latar"
        placeholder="https://example.com/music.mp3"
        value={data.musicUrl || ""}
        onChange={(e) => onChange({ musicUrl: e.target.value })}
        hint="Opsional. Link langsung ke file audio (MP3). Akan autoplay saat undangan dibuka."
      />

      <Textarea
        label="Pesan Penutup"
        placeholder="Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir..."
        value={data.closingMessage || ""}
        onChange={(e) => onChange({ closingMessage: e.target.value })}
        hint="Opsional. Pesan di bagian akhir undangan."
      />
    </div>
  );
}
