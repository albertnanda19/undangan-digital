"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { Heart } from "lucide-react";

interface Props {
  akadDate: string;
  receptionDate: string;
  themeConfig: Record<string, string>;
}

export function CountdownSection({ akadDate, receptionDate, themeConfig }: Props) {
  const targetDate = new Date(akadDate) > new Date() ? akadDate : receptionDate;
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const isJawa = themeConfig.ornamentStyle === "jawa";

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-lg"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        <span className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</span>
      </div>
      <span className="text-xs text-white/70 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <section id="countdown" className="py-16 md:py-24 px-4" style={{ backgroundColor: themeConfig.primaryColor }}>
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">{isJawa ? "Dinten Mulya" : "Menuju Hari Bahagia"}</h2>
        <p className="font-script text-xl text-white/70 mb-10">{isJawa ? "Pethitigan" : "Countdown"}</p>

        {isExpired ? (
          <div className="flex flex-col items-center gap-3">
            <Heart className="h-10 w-10 text-white fill-white" />
            <p className="font-display text-xl text-white">{isJawa ? "Sampun kalampahan, Matur nuwun" : "Alhamdulillah, Acara telah berlangsung"}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <TimeBox value={days} label={isJawa ? "Dinten" : "Hari"} />
            <span className="text-white text-2xl font-bold mb-6">:</span>
            <TimeBox value={hours} label="Jam" />
            <span className="text-white text-2xl font-bold mb-6">:</span>
            <TimeBox value={minutes} label="Menit" />
            <span className="text-white text-2xl font-bold mb-6">:</span>
            <TimeBox value={seconds} label="Detik" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
