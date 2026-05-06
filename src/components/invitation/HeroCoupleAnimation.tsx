"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MinangCoupleSilhouette,
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
      <div className="relative mx-auto mb-6 flex items-end justify-center gap-3 md:gap-6">
        {/* Groom photo with saluak badge */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 md:w-24"
              style={{ color: themeConfig.primaryColor }}
            >
              <MinangSaluakBadge accent={themeConfig.accentColor} />
            </div>
            <div
              className="relative w-32 h-40 md:w-40 md:h-52 rounded-full overflow-hidden border-4 shadow-2xl"
              style={{ borderColor: themeConfig.accentColor, backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <Image
                src={tenant.groomPhotoUrl as string}
                alt={tenant.groomName}
                fill
                priority
                sizes="(max-width: 768px) 128px, 160px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Center ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-script text-4xl md:text-5xl pb-6"
          style={{ color: themeConfig.accentColor }}
        >
          &
        </motion.div>

        {/* Bride photo with suntiang badge */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="relative"
          >
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 md:w-28"
              style={{ color: themeConfig.primaryColor }}
            >
              <MinangSuntiangBadge accent={themeConfig.accentColor} />
            </div>
            <div
              className="relative w-32 h-40 md:w-40 md:h-52 rounded-full overflow-hidden border-4 shadow-2xl"
              style={{ borderColor: themeConfig.accentColor, backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <Image
                src={tenant.bridePhotoUrl as string}
                alt={tenant.brideName}
                fill
                priority
                sizes="(max-width: 768px) 128px, 160px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Fallback: stylized SVG silhouette pasangan adat Minang
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      className="relative mx-auto mb-4 w-72 md:w-96"
      style={{ color: "#FFFFFF" }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      >
        <MinangCoupleSilhouette color="#FFFFFF" accent={themeConfig.accentColor} />
      </motion.div>

      {/* Subtle radial glow behind silhouette */}
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
