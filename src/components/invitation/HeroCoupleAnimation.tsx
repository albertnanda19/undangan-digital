"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MinangCornerFlourish,
  MinangSaluakBadge,
  MinangSuntiangBadge,
} from "./MinangOrnaments";
import type { Tenant, ThemeConfig } from "@/types";

type Props = {
  tenant: Tenant;
  themeConfig: ThemeConfig;
};

export function HeroCoupleAnimation({ tenant, themeConfig }: Props) {
  const hasBothPhotos = !!tenant.groomPhotoUrl && !!tenant.bridePhotoUrl;

  if (hasBothPhotos) {
    return (
      <div className="relative mx-auto mb-7 flex w-full max-w-[28rem] items-end justify-center gap-2 px-2 sm:gap-3 md:mb-8 md:max-w-[36rem] md:gap-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 bottom-4 -z-10 h-16 blur-2xl md:bottom-6 md:h-24"
          style={{
            background: `radial-gradient(ellipse at center, ${themeConfig.accentColor}55 0%, transparent 70%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -34, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          className="relative flex-1 max-w-[10rem] md:max-w-[12.5rem]"
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, -0.6, 0.4, 0] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -top-8 left-1/2 z-20 w-20 -translate-x-1/2 md:-top-10 md:w-24" style={{ color: themeConfig.primaryColor }}>
              <MinangSaluakBadge accent={themeConfig.accentColor} />
            </div>
            <div aria-hidden="true" className="absolute inset-2 rounded-[42%] border opacity-45" style={{ borderColor: `${themeConfig.accentColor}85` }} />
            <div className="relative h-40 w-32 overflow-hidden rounded-[45%] border-4 shadow-2xl md:h-52 md:w-40" style={{ borderColor: themeConfig.accentColor, backgroundColor: "rgba(255,255,255,0.08)" }}>
              <Image src={tenant.groomPhotoUrl as string} alt={tenant.groomName} fill priority sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 34%, rgba(0,0,0,0.12) 100%)" }} />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-5 top-4 h-20 w-10 rotate-12 bg-white/15 blur-md"
                animate={{ x: [-8, 22, -8], opacity: [0, 0.2, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.8 }} className="relative -mb-2 pb-4 md:pb-5">
          <motion.div
            animate={{ rotate: [0, 4, -4, 0], y: [0, -2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur-sm md:h-14 md:w-14"
          >
            <span className="font-script text-4xl md:text-5xl" style={{ color: themeConfig.accentColor }}>
              &
            </span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 34, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
          className="relative flex-1 max-w-[10rem] md:max-w-[12.5rem]"
        >
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 0.6, -0.4, 0] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -top-10 left-1/2 z-20 w-24 -translate-x-1/2 md:-top-12 md:w-28" style={{ color: themeConfig.primaryColor }}>
              <MinangSuntiangBadge accent={themeConfig.accentColor} />
            </div>
            <div aria-hidden="true" className="absolute inset-2 rounded-[42%] border opacity-45" style={{ borderColor: `${themeConfig.accentColor}85` }} />
            <div className="relative h-40 w-32 overflow-hidden rounded-[45%] border-4 shadow-2xl md:h-52 md:w-40" style={{ borderColor: themeConfig.accentColor, backgroundColor: "rgba(255,255,255,0.08)" }}>
              <Image src={tenant.bridePhotoUrl as string} alt={tenant.brideName} fill priority sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 34%, rgba(0,0,0,0.14) 100%)" }} />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 top-4 h-20 w-10 -rotate-12 bg-white/15 blur-md"
                animate={{ x: [8, -22, 8], opacity: [0, 0.2, 0] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Fallback: use the original couple image in hero
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      className="relative mx-auto mb-4 w-72 max-w-full px-2 md:w-[26rem]"
      style={{ color: "#FFFFFF" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-8 -z-10 h-28 blur-3xl md:h-36"
        style={{
          background: `radial-gradient(ellipse at center, ${themeConfig.accentColor}60 0%, transparent 72%)`,
        }}
      />
      <motion.div
        animate={{ y: [0, -8, 0], scale: [1, 1.01, 1] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto h-[20rem] w-[18rem] drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:h-[24rem] md:w-[22rem]"
      >
        <Image
          src="/images/minang-couple-real.png"
          alt="Ilustrasi pasangan adat Minang"
          fill
          priority
          sizes="(max-width: 768px) 288px, 352px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-10 w-16 text-white/70 md:w-20"
        animate={{ y: [0, -5, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <MinangCornerFlourish accent={themeConfig.accentColor} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute right-0 top-10 w-16 rotate-180 text-white/70 md:w-20"
        animate={{ y: [0, 5, 0], rotate: [180, 182, 180] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <MinangCornerFlourish accent={themeConfig.accentColor} />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 bottom-1 h-[1px]"
        style={{ backgroundColor: `${themeConfig.accentColor}A8` }}
        animate={{ opacity: [0.2, 0.55, 0.2], scaleX: [0.86, 1, 0.86] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${themeConfig.accentColor} 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}
