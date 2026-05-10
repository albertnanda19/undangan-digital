"use client";

import { motion } from "framer-motion";
import { getReligionContent } from "@/lib/religionContent";
import type { Religion, ThemeConfig } from "@/types";

interface Props {
  religion: Religion;
  groomName: string;
  brideName: string;
  brideFirst?: boolean;
  themeConfig: ThemeConfig;
}

export function OpeningSection({ religion, groomName, brideName, brideFirst, themeConfig }: Props) {
  const firstName = brideFirst ? brideName : groomName;
  const secondName = brideFirst ? groomName : brideName;
  const content = getReligionContent(religion);
  return (
    <section id="opening" className="invitation-section relative overflow-hidden" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-10 text-8xl pointer-events-none select-none">
        {religion === "islam" ? "☪" : religion === "hindu" ? "🕉" : religion === "buddha" ? "☸" : religion === "konghucu" ? "☯" : "✝"}
      </div>
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-script text-3xl md:text-4xl mb-8"
          style={{ color: themeConfig.primaryColor }}
        >
          {content.openingGreeting}
        </motion.p>

        {religion === "islam" && content.openingVerse.arabicText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl leading-loose mb-4"
            style={{ color: themeConfig.textColor, direction: "rtl" }}
          >
            {content.openingVerse.arabicText}
          </motion.p>
        )}

        {content.openingVerse.verseText && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl italic font-display leading-relaxed mb-4"
            style={{ color: themeConfig.textColor }}
          >
            {content.openingVerse.verseText}
          </motion.p>
        )}

        {content.openingVerse.translation && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base leading-relaxed px-4 mb-4"
            style={{ color: themeConfig.textColor, opacity: 0.8 }}
          >
            {content.openingVerse.translation}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm font-semibold tracking-widest uppercase mb-10"
          style={{ color: themeConfig.primaryColor }}
        >
          {content.openingVerse.verseReference}
        </motion.p>

        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px flex-1 max-w-16" style={{ backgroundColor: themeConfig.primaryColor, opacity: 0.4 }} />
          <div className="text-xl" style={{ color: themeConfig.primaryColor }}>{religion === "hindu" ? "🌸" : "✦"}</div>
          <div className="h-px flex-1 max-w-16" style={{ backgroundColor: themeConfig.primaryColor, opacity: 0.4 }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <p className="text-base md:text-lg leading-relaxed" style={{ color: themeConfig.textColor, opacity: 0.85 }}>
            {content.invitationOpener}
          </p>
          <p className="font-script text-4xl md:text-5xl mt-6" style={{ color: themeConfig.primaryColor }}>
            {firstName} & {secondName}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
