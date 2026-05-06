export function generateCSV(
  data: Record<string, unknown>[],
  headers: { key: string; label: string }[]
): string {
  const headerRow = headers.map((h) => h.label).join(",");
  const rows = data.map((row) =>
    headers
      .map((h) => {
        const value = row[h.key] ?? "";
        const str = String(value);
        return str.includes(",") || str.includes('"')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      })
      .join(",")
  );
  return [headerRow, ...rows].join("\n");
}

export function downloadCSV(filename: string, csvContent: string): void {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateRSVPExport(
  rsvpData: Record<string, unknown>[]
): string {
  return generateCSV(rsvpData, [
    { key: "name", label: "Nama" },
    { key: "phone", label: "Nomor HP" },
    { key: "attendance", label: "Status Kehadiran" },
    { key: "guest_count", label: "Jumlah Tamu" },
    { key: "event_type", label: "Acara" },
    { key: "message", label: "Pesan" },
    { key: "submitted_at", label: "Waktu Konfirmasi" },
  ]);
}

export function generateGuestExport(
  guests: Record<string, unknown>[]
): string {
  return generateCSV(guests, [
    { key: "name", label: "Nama" },
    { key: "phone", label: "Nomor HP" },
    { key: "invitation_code", label: "Kode Undangan" },
    { key: "category", label: "Kategori" },
    { key: "is_vip", label: "VIP" },
    { key: "seat_number", label: "Nomor Meja" },
    { key: "notes", label: "Catatan" },
  ]);
}
