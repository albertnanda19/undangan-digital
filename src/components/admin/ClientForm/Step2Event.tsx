"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ClientFormData } from "@/types";

interface Step2Props {
  data: Partial<ClientFormData>;
  onChange: (data: Partial<ClientFormData>) => void;
}

export function Step2Event({ data, onChange }: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#E2E8F0]">Detail Acara</h2>
        <p className="text-sm text-[#94A3B8] mt-1">Informasi waktu dan tempat acara pernikahan</p>
      </div>

      {/* Akad */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#6C63FF]">Akad Nikah</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Tanggal"
            type="date"
            value={data.akadDate || ""}
            onChange={(e) => onChange({ akadDate: e.target.value })}
          />
          <Input
            label="Jam Mulai"
            type="time"
            value={data.akadTimeStart || ""}
            onChange={(e) => onChange({ akadTimeStart: e.target.value })}
          />
          <Input
            label="Jam Selesai"
            type="time"
            value={data.akadTimeEnd || ""}
            onChange={(e) => onChange({ akadTimeEnd: e.target.value })}
          />
        </div>
        <Input
          label="Nama Venue"
          placeholder="Masjid Al-Akbar"
          value={data.akadVenueName || ""}
          onChange={(e) => onChange({ akadVenueName: e.target.value })}
        />
        <Textarea
          label="Alamat Venue"
          placeholder="Jl. Masjid Raya No. 1, Jakarta Selatan"
          value={data.akadVenueAddress || ""}
          onChange={(e) => onChange({ akadVenueAddress: e.target.value })}
        />
        <Input
          label="Link Google Maps"
          placeholder="https://maps.google.com/..."
          value={data.akadMapsUrl || ""}
          onChange={(e) => onChange({ akadMapsUrl: e.target.value })}
        />
      </div>

      {/* Resepsi */}
      <div className="space-y-4 border-t border-[#2A2D3E] pt-6">
        <h3 className="text-sm font-medium text-[#6C63FF]">Resepsi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Tanggal"
            type="date"
            value={data.receptionDate || ""}
            onChange={(e) => onChange({ receptionDate: e.target.value })}
          />
          <Input
            label="Jam Mulai"
            type="time"
            value={data.receptionTimeStart || ""}
            onChange={(e) => onChange({ receptionTimeStart: e.target.value })}
          />
          <Input
            label="Jam Selesai"
            type="time"
            value={data.receptionTimeEnd || ""}
            onChange={(e) => onChange({ receptionTimeEnd: e.target.value })}
          />
        </div>
        <Input
          label="Nama Venue"
          placeholder="Grand Ballroom Hotel"
          value={data.receptionVenueName || ""}
          onChange={(e) => onChange({ receptionVenueName: e.target.value })}
        />
        <Textarea
          label="Alamat Venue"
          placeholder="Jl. Sudirman No. 10, Jakarta Pusat"
          value={data.receptionVenueAddress || ""}
          onChange={(e) => onChange({ receptionVenueAddress: e.target.value })}
        />
        <Input
          label="Link Google Maps"
          placeholder="https://maps.google.com/..."
          value={data.receptionMapsUrl || ""}
          onChange={(e) => onChange({ receptionMapsUrl: e.target.value })}
        />
      </div>

      {/* Additional */}
      <div className="space-y-4 border-t border-[#2A2D3E] pt-6">
        <h3 className="text-sm font-medium text-[#6C63FF]">Informasi Tambahan</h3>
        <Input
          label="Dress Code"
          placeholder="Pastel / Batik / Formal"
          value={data.dresscode || ""}
          onChange={(e) => onChange({ dresscode: e.target.value })}
          hint="Opsional"
        />
        <Textarea
          label="Catatan Tambahan"
          placeholder="Informasi tambahan untuk tamu..."
          value={data.additionalNotes || ""}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          hint="Opsional"
        />
      </div>
    </div>
  );
}
