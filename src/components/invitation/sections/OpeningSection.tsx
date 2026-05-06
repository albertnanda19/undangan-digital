"use client";

import { motion } from "framer-motion";

interface Props {
  themeConfig: Record<string, string>;
}

export function OpeningSection({ themeConfig }: Props) {
  return (
    <section id="opening" className="invitation-section" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Bismillah */}
        <p className="font-display text-2xl sm:text-3xl mb-6" style={{ color: themeConfig.primaryColor }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ
        </p>

        {/* Surah Ar-Rum: 21 */}
        <div className="mb-8 px-4">
          <p className="font-body text-sm leading-relaxed opacity-80" style={{ color: themeConfig.textColor }}>
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu
            dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu
            rasa kasih dan sayang.&rdquo;
          </p>
          <p className="text-sm mt-3 font-medium opacity-60" style={{ color: themeConfig.textColor }}>
            — QS. Ar-Rum: 21
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-16" style={{ backgroundColor: themeConfig.primaryColor, opacity: 0.3 }} />
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: themeConfig.primaryColor }} />
          <div className="h-px w-16" style={{ backgroundColor: themeConfig.primaryColor, opacity: 0.3 }} />
        </div>

        <p className="font-body text-sm opacity-70" style={{ color: themeConfig.textColor }}>
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>
        <p className="font-body text-sm mt-4 leading-relaxed opacity-80" style={{ color: themeConfig.textColor }}>
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud menyelenggarakan
          acara pernikahan putra-putri kami. Merupakan suatu kehormatan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
      </motion.div>
    </section>
  );
}
