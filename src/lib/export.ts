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

function personalInvitationUrl(invitationPageUrl: string, guestName: string): string {
  const base = invitationPageUrl.replace(/\/$/, "");
  return `${base}?${new URLSearchParams({ to: guestName }).toString()}`;
}

export function guestImportTemplateCsvContent(): string {
  return [
    "Nama,Nomor HP,Kategori (family/friend/colleague/other),VIP (ya/tidak),Nomor Meja,Catatan",
    "Budi Santoso,08123456789,family,tidak,,",
    "Ani Wijaya,08987654321,friend,ya,A1,Teman SMA",
  ].join("\n");
}

export function downloadGuestImportTemplate(): void {
  downloadCSV("template-tamu.csv", guestImportTemplateCsvContent());
}

export function generateGuestExport(
  guests: Record<string, unknown>[],
  invitationPageUrl: string
): string {
  const rows = guests.map((g) => ({
    ...g,
    invitation_personal_url: personalInvitationUrl(
      invitationPageUrl,
      String(g.name ?? "")
    ),
  }));
  return generateCSV(rows, [
    { key: "name", label: "Nama" },
    { key: "phone", label: "Nomor HP" },
    { key: "invitation_code", label: "Kode Undangan" },
    { key: "category", label: "Kategori" },
    { key: "is_vip", label: "VIP" },
    { key: "seat_number", label: "Nomor Meja" },
    { key: "notes", label: "Catatan" },
    { key: "invitation_personal_url", label: "Link Undangan Personal" },
  ]);
}
