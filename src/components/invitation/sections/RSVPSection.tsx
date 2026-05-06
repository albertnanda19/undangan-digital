"use client";

import { motion } from "framer-motion";
import { RSVPForm } from "../RSVPForm";

interface Props {
  tenantId: string;
  guestName?: string;
  themeConfig: Record<string, string>;
}

export function RSVPSection({ tenantId, guestName, themeConfig }: Props) {
  return (
    <section id="rsvp" className="invitation-section" style={{ backgroundColor: themeConfig.secondaryColor }}>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>Konfirmasi Kehadiran</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>RSVP</p>
        <p className="text-center text-sm opacity-70 mb-8" style={{ color: themeConfig.textColor }}>
          Merupakan kehormatan bagi kami apabila Anda berkenan hadir
        </p>

        <div className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: themeConfig.primaryColor + "20", backgroundColor: themeConfig.backgroundColor }}>
          <RSVPForm tenantId={tenantId} guestName={guestName} themeConfig={themeConfig} />
        </div>
      </motion.div>
    </section>
  );
}
