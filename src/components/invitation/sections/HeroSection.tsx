"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { LottieAnimation } from "../LottieAnimation";

interface Props {
  groomNickname: string;
  brideNickname: string;
  akadDate: string;
  coverPhotoUrl?: string;
  themeConfig: Record<string, string>;
  lottieUrl?: string;
}

export function HeroSection({ groomNickname, brideNickname, akadDate, coverPhotoUrl, themeConfig, lottieUrl }: Props) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {coverPhotoUrl ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${coverPhotoUrl})` }} />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${themeConfig.secondaryColor} 0%, ${themeConfig.backgroundColor} 100%)` }} />
      )}
      <div className="absolute inset-0 bg-gradient-hero" />

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {lottieUrl && (
          <div className="flex justify-center mb-4">
            <LottieAnimation url={lottieUrl} width={150} height={150} />
          </div>
        )}
        <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4">The Wedding of</p>
        <h1 className="font-script text-5xl sm:text-7xl text-white mb-4">
          {groomNickname} & {brideNickname}
        </h1>
        <p className="font-display text-xl text-white/80">{formatDate(akadDate)}</p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-white/60" />
      </motion.div>
    </section>
  );
}
