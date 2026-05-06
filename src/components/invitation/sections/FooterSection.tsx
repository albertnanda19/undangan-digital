"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

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

  const handleShare = async () => {
    const shareData = {
      title: `Undangan Pernikahan ${groomNickname} & ${brideNickname}`,
      text: `Kami mengundang Anda ke pernikahan ${groomNickname} & ${brideNickname}`,
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

        <p className="text-sm opacity-60 mb-2" style={{ color: themeConfig.textColor }}>Wassalamu&apos;alaikum Wr. Wb.</p>

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
          <Share2 className="h-4 w-4" /> Bagikan Undangan
        </button>

        <p className="mt-12 text-xs opacity-40" style={{ color: themeConfig.textColor }}>
          Dibuat dengan ❤️ Undangan Digital
        </p>
      </motion.div>
    </section>
  );
}
