"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { AksaraJawaOrnament, LungLungan } from "@/components/invitation/JawaOrnaments";

interface Props {
  groomNickname: string;
  brideNickname: string;
  akadDate: string;
  closingMessage?: string;
  slug: string;
  themeConfig: Record<string, string>;
}

export function FooterSection({ groomNickname, brideNickname, akadDate, closingMessage, slug, themeConfig }: Props) {
  const invitationUrl = typeof window !== "undefined" ? `${window.location.origin}/${slug}` : "";
  const isJawa = themeConfig.ornamentStyle === "jawa" || themeConfig.ornamentStyle === "jawa-madu" || themeConfig.ornamentStyle === "jawa-hijau";
  const isJawaHijau = themeConfig.ornamentStyle === "jawa-hijau";

  const handleShare = async () => {
    const shareTitle = isJawaHijau
      ? `Undangan Pernikahan ${groomNickname} & ${brideNickname}`
      : isJawa
        ? `Undangan Panggih ${groomNickname} & ${brideNickname}`
        : `Undangan Pernikahan ${groomNickname} & ${brideNickname}`;
    const shareText = isJawaHijau
      ? `Kami mengundang Anda ke pernikahan ${groomNickname} & ${brideNickname}`
      : isJawa
        ? `Kawula ngaturi uninga bilih putra-putri kula badhe ngelampahi panggih. Mugi kersa rawuh.`
        : `Kami mengundang Anda ke pernikahan ${groomNickname} & ${brideNickname}`;
    const shareData = {
      title: shareTitle,
      text: shareText,
      url: invitationUrl,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(invitationUrl);
      alert("Link undangan berhasil disalin!");
    }
  };

  return (
    <section id="footer" className="py-16 md:py-24 px-4" style={{ backgroundColor: themeConfig.primaryColor + "15" }}>
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {closingMessage && (
          <p className="font-body text-sm leading-relaxed mb-8 opacity-80" style={{ color: themeConfig.textColor }}>
            {closingMessage}
          </p>
        )}

        {isJawaHijau ? (
          <p className="text-sm opacity-60 mb-2" style={{ color: themeConfig.textColor }}>Wassalamu&apos;alaikum Wr. Wb.</p>
        ) : isJawa ? (
          <>
            <div className="mb-4 flex justify-center">
              <AksaraJawaOrnament accent={themeConfig.accentColor} />
            </div>
            <p className="font-body text-sm leading-relaxed mb-4 opacity-80 italic" style={{ color: themeConfig.textColor }}>
              "Sakderengipun, kawula ngaturaken agunging panuwun dhumateng para rawuh ingkang sampun kersa rawuh lan ndoakaken"
            </p>
            <div className="my-6">
              <LungLungan accent={themeConfig.accentColor} />
            </div>
            <p className="text-sm opacity-60 mb-1" style={{ color: themeConfig.textColor }}>Matur nuwun</p>
          </>
        ) : (
          <p className="text-sm opacity-60 mb-2" style={{ color: themeConfig.textColor }}>Wassalamu&apos;alaikum Wr. Wb.</p>
        )}

        <h2 className="font-script text-4xl sm:text-5xl my-6" style={{ color: themeConfig.primaryColor }}>
          {groomNickname} & {brideNickname}
        </h2>

        <p className="font-display text-sm opacity-70" style={{ color: themeConfig.textColor }}>
          {formatDate(akadDate)}
        </p>

        <button
          onClick={handleShare}
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: themeConfig.primaryColor }}
        >
          <Share2 className="h-4 w-4" /> {isJawaHijau ? "Bagikan Undangan" : isJawa ? "Tebar Undangan" : "Bagikan Undangan"}
        </button>

        <p className="mt-12 text-xs opacity-40" style={{ color: themeConfig.textColor }}>
          {isJawaHijau ? "Dibuat dengan ❤️ Undangan Digital" : isJawa ? "Dipundamel — Undangan Digital" : "Dibuat dengan ❤️ Undangan Digital"}
        </p>
      </motion.div>
    </section>
  );
}
