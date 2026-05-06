import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistance } from "date-fns";
import { id as localeId } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(
  date: string | Date,
  formatStr = "EEEE, d MMMM yyyy"
): string {
  return format(new Date(date), formatStr, { locale: localeId });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  return `${h}.${m}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function timeAgo(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: localeId,
  });
}

export function generateInvitationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function generateWhatsAppMessage(
  guestName: string,
  groomName: string,
  brideName: string,
  invitationUrl: string
): string {
  return `Assalamu'alaikum Wr. Wb.\n\nKepada Yth.\n*${guestName}*\n\nDengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami:\n\n*${groomName}* & *${brideName}*\n\nInformasi lengkap dan konfirmasi kehadiran:\n${invitationUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nWassalamu'alaikum Wr. Wb.`;
}

export function generateICSContent(event: {
  title: string;
  startDate: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}): string {
  const formatICSDate = (date: string, time: string) => {
    const dt = new Date(`${date}T${time}`);
    return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Undangan Digital//ID",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(event.startDate, event.startTime)}`,
    `DTEND:${formatICSDate(event.startDate, event.endTime)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
