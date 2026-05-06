"use client";

import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ClientFormData } from "@/types";

interface Step1Props {
  data: Partial<ClientFormData>;
  onChange: (data: Partial<ClientFormData>) => void;
}

export function Step1Identity({ data, onChange }: Step1Props) {
  const handleGroomNameChange = (value: string) => {
    onChange({ groomName: value });
    if (!data.slug || data.slug === slugify(`${data.groomName || ""}-${data.brideName || ""}`)) {
      onChange({ groomName: value, slug: slugify(`${value}-${data.brideName || ""}`) });
    }
  };

  const handleBrideNameChange = (value: string) => {
    onChange({ brideName: value });
    if (!data.slug || data.slug === slugify(`${data.groomName || ""}-${data.brideName || ""}`)) {
      onChange({ brideName: value, slug: slugify(`${data.groomName || ""}-${value}`) });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#E2E8F0]">Identitas Mempelai</h2>
        <p className="text-sm text-[#94A3B8] mt-1">Informasi dasar pasangan pengantin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mempelai Pria */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#6C63FF]">Mempelai Pria</h3>
          <Input
            label="Nama Lengkap"
            placeholder="Muhammad Ahmad"
            value={data.groomName || ""}
            onChange={(e) => handleGroomNameChange(e.target.value)}
          />
          <Input
            label="Nama Panggilan"
            placeholder="Ahmad"
            value={data.groomNickname || ""}
            onChange={(e) => onChange({ groomNickname: e.target.value })}
          />
          <Input
            label="Nama Ayah"
            placeholder="Bapak H. Abdullah"
            value={data.groomFather || ""}
            onChange={(e) => onChange({ groomFather: e.target.value })}
          />
          <Input
            label="Nama Ibu"
            placeholder="Ibu Hj. Siti Aminah"
            value={data.groomMother || ""}
            onChange={(e) => onChange({ groomMother: e.target.value })}
          />
          <Input
            label="Urutan Anak"
            placeholder="Putra pertama"
            value={data.groomBirthOrder || ""}
            onChange={(e) => onChange({ groomBirthOrder: e.target.value })}
          />
        </div>

        {/* Mempelai Wanita */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#6C63FF]">Mempelai Wanita</h3>
          <Input
            label="Nama Lengkap"
            placeholder="Fatimah Azzahra"
            value={data.brideName || ""}
            onChange={(e) => handleBrideNameChange(e.target.value)}
          />
          <Input
            label="Nama Panggilan"
            placeholder="Fatimah"
            value={data.brideNickname || ""}
            onChange={(e) => onChange({ brideNickname: e.target.value })}
          />
          <Input
            label="Nama Ayah"
            placeholder="Bapak H. Ibrahim"
            value={data.brideFather || ""}
            onChange={(e) => onChange({ brideFather: e.target.value })}
          />
          <Input
            label="Nama Ibu"
            placeholder="Ibu Hj. Khadijah"
            value={data.brideMother || ""}
            onChange={(e) => onChange({ brideMother: e.target.value })}
          />
          <Input
            label="Urutan Anak"
            placeholder="Putri kedua dari 3 bersaudara"
            value={data.brideBirthOrder || ""}
            onChange={(e) => onChange({ brideBirthOrder: e.target.value })}
          />
        </div>
      </div>

      <div className="rounded-lg border border-[#2A2D3E] p-4">
        <p className="text-sm font-medium text-[#E2E8F0] mb-2">Agama Pasangan</p>
        <Select
          value={data.religion || "islam"}
          onValueChange={(value) => onChange({ religion: value as ClientFormData["religion"] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih agama" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="islam">Islam</SelectItem>
            <SelectItem value="kristen">Kristen Protestan</SelectItem>
            <SelectItem value="katolik">Katolik</SelectItem>
            <SelectItem value="hindu">Hindu</SelectItem>
            <SelectItem value="buddha">Buddha</SelectItem>
            <SelectItem value="konghucu">Konghucu</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-[#94A3B8] mt-2">
          Agama menentukan kutipan pembuka dan ornamen halaman undangan
        </p>
      </div>

      {/* Slug */}
      <div className="border-t border-[#2A2D3E] pt-4">
        <Input
          label="URL Slug"
          placeholder="ahmad-fatimah"
          value={data.slug || ""}
          onChange={(e) => onChange({ slug: slugify(e.target.value) })}
          hint={data.slug ? `Preview: ${process.env.NEXT_PUBLIC_APP_URL || "https://domain.com"}/${data.slug}` : "Akan digenerate otomatis dari nama"}
        />
      </div>
    </div>
  );
}
