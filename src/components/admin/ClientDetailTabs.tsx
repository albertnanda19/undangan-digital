"use client";

import { useState } from "react";
import { Download, Upload, MessageCircle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate, formatTime, formatEventEndTime } from "@/lib/utils";
import { GuestImport } from "@/components/admin/GuestImport";
import { WhatsAppGenerator } from "@/components/admin/WhatsAppGenerator";
import { QRCodeGenerator } from "@/components/admin/QRCodeGenerator";
import { GuestManager } from "@/components/admin/GuestManager";
import { generateRSVPExport, generateGuestExport, downloadCSV } from "@/lib/export";

interface Props {
  tenantId: string;
  tenant: Record<string, unknown>;
  stats: { totalGuests: number; totalRSVP: number; totalHadir: number };
  rsvpList: Record<string, unknown>[];
  guests: Record<string, unknown>[];
  invitationUrl: string;
}

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "guests", label: "Tamu & RSVP" },
  { key: "manage-guests", label: "Kelola Tamu" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "qrcode", label: "QR Code" },
] as const;

export function ClientDetailTabs({ tenantId, tenant, stats, rsvpList, guests, invitationUrl }: Props) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showImport, setShowImport] = useState(false);

  const handleExportRSVP = () => {
    const csv = generateRSVPExport(rsvpList);
    downloadCSV(`rsvp-${tenant.slug}.csv`, csv);
  };

  const handleExportGuests = () => {
    const csv = generateGuestExport(guests);
    downloadCSV(`tamu-${tenant.slug}.csv`, csv);
  };

  const guestsForWA = guests.map((g) => ({
    name: g.name as string,
    phone: (g.phone as string) || undefined,
    invitationCode: g.invitation_code as string,
  }));

  return (
    <div>
      {/* Tab Nav */}
      <div className="flex gap-1 border-b border-[#2A2D3E] mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-[#6C63FF] text-[#6C63FF]"
                : "border-transparent text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Event Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5">
              <h3 className="text-sm font-medium text-[#6C63FF] mb-3">Akad Nikah</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#E2E8F0]">{formatDate(tenant.akad_date as string)}</p>
                <p className="text-[#94A3B8]">{formatTime(tenant.akad_time_start as string)} - {formatEventEndTime(tenant.akad_time_end as string)}</p>
                <p className="text-[#E2E8F0] font-medium">{tenant.akad_venue_name as string}</p>
                <p className="text-[#94A3B8]">{tenant.akad_venue_address as string}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5">
              <h3 className="text-sm font-medium text-[#6C63FF] mb-3">Resepsi</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#E2E8F0]">{formatDate(tenant.reception_date as string)}</p>
                <p className="text-[#94A3B8]">{formatTime(tenant.reception_time_start as string)} - {formatEventEndTime(tenant.reception_time_end as string)}</p>
                <p className="text-[#E2E8F0] font-medium">{tenant.reception_venue_name as string}</p>
                <p className="text-[#94A3B8]">{tenant.reception_venue_address as string}</p>
              </div>
            </div>
          </div>

          {/* Link */}
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5">
            <h3 className="text-sm font-medium text-[#E2E8F0] mb-3">Link Undangan</h3>
            <code className="text-sm text-[#6C63FF] break-all">{invitationUrl}</code>
          </div>
        </div>
      )}

      {activeTab === "guests" && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#E2E8F0]">Konfirmasi Kehadiran</span>
              <span className="text-xs text-[#94A3B8]">{stats.totalHadir} dari {stats.totalGuests} tamu</span>
            </div>
            <div className="w-full bg-[#0F1117] rounded-full h-2">
              <div
                className="bg-[#6C63FF] h-2 rounded-full transition-all"
                style={{ width: `${stats.totalGuests > 0 ? (stats.totalHadir / stats.totalGuests) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Guest List */}
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27]">
            <div className="p-5 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#E2E8F0]">Daftar Tamu ({guests.length})</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowImport(!showImport)}>
                  <Upload className="h-4 w-4 mr-1" /> Import CSV
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportGuests}>
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>

            {showImport && (
              <div className="px-5 pb-4 border-b border-[#2A2D3E]">
                <GuestImport tenantId={tenantId} onComplete={() => setShowImport(false)} />
              </div>
            )}

            {guests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kode</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>VIP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guests.map((guest) => (
                    <TableRow key={guest.id as string}>
                      <TableCell className="font-medium">{guest.name as string}</TableCell>
                      <TableCell className="font-mono text-xs text-[#94A3B8]">{guest.invitation_code as string}</TableCell>
                      <TableCell className="capitalize text-[#94A3B8]">{guest.category as string}</TableCell>
                      <TableCell>{guest.is_vip ? <Badge variant="warning">VIP</Badge> : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="px-5 pb-5 text-sm text-[#94A3B8]">Belum ada tamu terdaftar.</p>
            )}
          </div>

          {/* RSVP List */}
          <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27]">
            <div className="p-5 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#E2E8F0]">RSVP Masuk ({rsvpList.length})</h3>
              <Button variant="outline" size="sm" onClick={handleExportRSVP}>
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </Button>
            </div>
            {rsvpList.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>HP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvpList.map((rsvp) => (
                    <TableRow key={rsvp.id as string}>
                      <TableCell className="font-medium">{rsvp.name as string}</TableCell>
                      <TableCell className="text-[#94A3B8]">{(rsvp.phone as string) || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={(rsvp.attendance as string) === "hadir" ? "success" : (rsvp.attendance as string) === "tidak_hadir" ? "destructive" : "warning"}>
                          {(rsvp.attendance as string) === "hadir" ? "Hadir" : (rsvp.attendance as string) === "tidak_hadir" ? "Tidak Hadir" : "Mungkin"}
                        </Badge>
                      </TableCell>
                      <TableCell>{rsvp.guest_count as number}</TableCell>
                      <TableCell className="text-[#94A3B8] text-xs">{formatDate(rsvp.submitted_at as string, "d MMM, HH:mm")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="px-5 pb-5 text-sm text-[#94A3B8]">Belum ada RSVP.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "manage-guests" && (
        <GuestManager
          tenantId={tenantId}
          tenantSlug={tenant.slug as string}
          groomName={tenant.groom_name as string}
          brideName={tenant.bride_name as string}
          receptionDate={tenant.reception_date as string}
          receptionVenueName={tenant.reception_venue_name as string}
          appUrl={typeof window !== "undefined" ? window.location.origin : ""}
        />
      )}

      {activeTab === "whatsapp" && (
        <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5">
          <WhatsAppGenerator
            groomName={tenant.groom_name as string}
            brideName={tenant.bride_name as string}
            receptionDate={tenant.reception_date as string}
            receptionVenueName={tenant.reception_venue_name as string}
            slug={tenant.slug as string}
            guests={guestsForWA}
          />
        </div>
      )}

      {activeTab === "qrcode" && (
        <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5">
          <QRCodeGenerator url={invitationUrl} title={`${tenant.groom_name} & ${tenant.bride_name}`} />
        </div>
      )}
    </div>
  );
}
