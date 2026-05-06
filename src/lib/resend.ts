import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRSVPNotification(params: {
  toEmail: string;
  groomName: string;
  brideName: string;
  guestName: string;
  attendance: string;
  guestCount: number;
}): Promise<void> {
  const attendanceText =
    params.attendance === "hadir"
      ? `HADIR (${params.guestCount} orang)`
      : params.attendance === "tidak_hadir"
        ? "Tidak Hadir"
        : "Belum Pasti";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "noreply@resend.dev",
    to: params.toEmail,
    subject: `RSVP Baru — ${params.groomName} & ${params.brideName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E8748A;">Ada RSVP Baru!</h2>
        <p><strong>Undangan:</strong> ${params.groomName} & ${params.brideName}</p>
        <p><strong>Tamu:</strong> ${params.guestName}</p>
        <p><strong>Status:</strong> ${attendanceText}</p>
        <hr/>
        <p style="color: #888; font-size: 12px;">Notifikasi dari Platform Undangan Digital</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(params: {
  toEmail: string;
  groomName: string;
  brideName: string;
  invitationUrl: string;
}): Promise<void> {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "noreply@resend.dev",
    to: params.toEmail,
    subject: `Undangan Digital ${params.groomName} & ${params.brideName} Siap!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E8748A;">Undangan Digital Anda Sudah Siap!</h2>
        <p>Halo, undangan digital untuk <strong>${params.groomName} & ${params.brideName}</strong> sudah berhasil dibuat.</p>
        <p>Link undangan Anda:</p>
        <a href="${params.invitationUrl}" style="display:inline-block;background:#E8748A;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">${params.invitationUrl}</a>
        <p>Bagikan link ini kepada tamu-tamu Anda melalui WhatsApp.</p>
        <hr/>
        <p style="color: #888; font-size: 12px;">Platform Undangan Digital</p>
      </div>
    `,
  });
}

export default resend;
