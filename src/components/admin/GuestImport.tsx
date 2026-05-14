"use client";

import { useState, useCallback } from "react";
import { Upload, Download, AlertCircle, CheckCircle } from "lucide-react";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateInvitationCode } from "@/lib/utils";
import { downloadGuestImportTemplate } from "@/lib/export";

interface ParsedGuest {
  name: string;
  phone?: string;
  category: string;
  isVip: boolean;
  seatNumber?: string;
  notes?: string;
  valid: boolean;
  error?: string;
}

interface GuestImportProps {
  tenantId: string;
  onComplete?: () => void;
}

export function GuestImport({ tenantId, onComplete }: GuestImportProps) {
  const [parsedData, setParsedData] = useState<ParsedGuest[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number } | null>(null);

  const validCategories = ["family", "friend", "colleague", "other"];

  const handleFile = useCallback((file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed: ParsedGuest[] = results.data.map((row: unknown) => {
          const r = row as Record<string, string>;
          const name = (r["Nama"] || r["name"] || "").trim();
          const phone = (r["Nomor HP"] || r["phone"] || "").trim();
          const category = (r["Kategori (family/friend/colleague/other)"] || r["Kategori"] || r["category"] || "friend").trim().toLowerCase();
          const vipStr = (r["VIP (ya/tidak)"] || r["VIP"] || r["vip"] || "tidak").trim().toLowerCase();
          const seatNumber = (r["Nomor Meja"] || r["seat"] || "").trim();
          const notes = (r["Catatan"] || r["notes"] || "").trim();

          let valid = true;
          let error: string | undefined;

          if (!name) { valid = false; error = "Nama kosong"; }
          else if (!validCategories.includes(category)) { valid = false; error = `Kategori "${category}" tidak valid`; }

          return {
            name,
            phone: phone || undefined,
            category: validCategories.includes(category) ? category : "friend",
            isVip: vipStr === "ya" || vipStr === "yes" || vipStr === "true",
            seatNumber: seatNumber || undefined,
            notes: notes || undefined,
            valid,
            error,
          };
        });
        setParsedData(parsed);
      },
    });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const downloadTemplate = () => {
    downloadGuestImportTemplate();
  };

  const handleImport = async () => {
    const validGuests = parsedData.filter((g) => g.valid);
    if (validGuests.length === 0) return;

    setImporting(true);
    try {
      const guests = validGuests.map((g) => ({
        tenantId,
        name: g.name,
        phone: g.phone,
        invitationCode: generateInvitationCode(),
        category: g.category,
        isVip: g.isVip,
        seatNumber: g.seatNumber,
        notes: g.notes,
      }));

      const res = await axios.post(`/api/admin/clients/${tenantId}/guests`, { guests });
      const imported = res.data.data?.length || 0;
      setResult({ success: imported, failed: validGuests.length - imported });
      toast.success(`${imported} tamu berhasil diimport`);
      onComplete?.();
    } catch {
      toast.error("Gagal mengimport tamu");
    } finally {
      setImporting(false);
    }
  };

  const validCount = parsedData.filter((g) => g.valid).length;
  const invalidCount = parsedData.filter((g) => !g.valid).length;

  if (result) {
    return (
      <div className="text-center py-8 space-y-4">
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
        <h3 className="text-lg font-semibold text-[#E2E8F0]">Import Selesai</h3>
        <p className="text-sm text-[#94A3B8]">{result.success} tamu berhasil diimport{result.failed > 0 ? `, ${result.failed} gagal` : ""}</p>
        <Button variant="outline" onClick={() => { setParsedData([]); setResult(null); }}>Import Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#E2E8F0]">Import Tamu dari CSV</h3>
        <Button variant="outline" size="sm" onClick={downloadTemplate}>
          <Download className="h-4 w-4 mr-1" /> Unduh Template
        </Button>
      </div>

      {parsedData.length === 0 ? (
        <div
          className="border-2 border-dashed border-[#2A2D3E] rounded-xl p-8 text-center hover:border-[#6C63FF] transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input type="file" accept=".csv,.xlsx" onChange={handleInputChange} className="hidden" id="csv-upload" />
          <label htmlFor="csv-upload" className="cursor-pointer">
            <Upload className="h-10 w-10 text-[#94A3B8] mx-auto mb-3" />
            <p className="text-sm text-[#94A3B8]">Drag & drop file CSV di sini atau klik untuk memilih</p>
            <p className="text-xs text-[#475569] mt-1">Format: .csv</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">{validCount} baris valid</span>
            {invalidCount > 0 && <span className="text-red-400">{invalidCount} baris akan dilewati</span>}
            <span className="text-[#94A3B8]">Total: {parsedData.length}</span>
          </div>

          <div className="max-h-60 overflow-auto rounded-lg border border-[#2A2D3E]">
            <table className="w-full text-xs">
              <thead className="bg-[#0F1117] sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-[#94A3B8]">Nama</th>
                  <th className="px-3 py-2 text-left text-[#94A3B8]">HP</th>
                  <th className="px-3 py-2 text-left text-[#94A3B8]">Kategori</th>
                  <th className="px-3 py-2 text-left text-[#94A3B8]">Status</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 20).map((g, i) => (
                  <tr key={i} className={g.valid ? "" : "bg-red-500/5"}>
                    <td className="px-3 py-1.5 text-[#E2E8F0]">{g.name || "-"}</td>
                    <td className="px-3 py-1.5 text-[#94A3B8]">{g.phone || "-"}</td>
                    <td className="px-3 py-1.5 text-[#94A3B8] capitalize">{g.category}</td>
                    <td className="px-3 py-1.5">
                      {g.valid ? (
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                      ) : (
                        <span className="flex items-center gap-1 text-red-400"><AlertCircle className="h-3.5 w-3.5" />{g.error}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleImport} loading={importing} disabled={validCount === 0}>
              Import {validCount} Tamu
            </Button>
            <Button variant="outline" onClick={() => setParsedData([])}>Batal</Button>
          </div>
        </div>
      )}
    </div>
  );
}
