"use client";

import { motion } from "framer-motion";

interface Props {
  loveStory: string;
  themeConfig: Record<string, string>;
}

export function LoveStorySection({ loveStory, themeConfig }: Props) {
  const isJawa = themeConfig.ornamentStyle === "jawa" || themeConfig.ornamentStyle === "jawa-madu" || themeConfig.ornamentStyle === "jawa-hijau";
  const isJawaHijau = themeConfig.ornamentStyle === "jawa-hijau";
  return (
    <section id="love-story" className="invitation-section" style={{ backgroundColor: themeConfig.secondaryColor }}>
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>{isJawaHijau ? "Kisah Cinta Kami" : isJawa ? "Lelakon" : "Kisah Cinta Kami"}</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>{isJawaHijau ? "Love Story" : isJawa ? "Pasahan" : "Love Story"}</p>

        <div
          className="font-body text-sm sm:text-base leading-relaxed whitespace-pre-line opacity-80"
          style={{ color: themeConfig.textColor }}
        >
          {loveStory}
        </div>
      </motion.div>
    </section>
  );
}
