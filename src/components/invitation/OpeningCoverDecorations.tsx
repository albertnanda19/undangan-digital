"use client";

import { motion } from "framer-motion";
import {
  MarawaFlags,
  MinangCornerFlourish,
  RumahGadangRoof,
} from "@/components/invitation/MinangOrnaments";
import {
  Gunungan,
  CandiSilhouette,
  BatikKawungPattern,
  JawaCornerFlourish,
  WayangSilhouette,
} from "@/components/invitation/JawaOrnaments";

type OpeningThemeConfig = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  ornamentStyle?: string;
};

type Props = {
  themeConfig: OpeningThemeConfig;
  hasCoverPhoto: boolean;
  isIslamic?: boolean;
};

export function OpeningCoverDecorations({ themeConfig, hasCoverPhoto, isIslamic }: Props) {
  const ornamentStyle = themeConfig.ornamentStyle ?? "floral";
  const primary = themeConfig.primaryColor ?? "#E8748A";
  const secondary = themeConfig.secondaryColor ?? "#FDF2F8";
  const accent = themeConfig.accentColor ?? primary;
  const layerOpacity = hasCoverPhoto ? 0.55 : 0.9;
  const shimmerDots = [
    { left: "10%", top: "14%", size: "6px", delay: 0 },
    { left: "22%", top: "28%", size: "4px", delay: 0.3 },
    { left: "36%", top: "12%", size: "5px", delay: 0.7 },
    { left: "52%", top: "24%", size: "4px", delay: 0.2 },
    { left: "66%", top: "16%", size: "6px", delay: 1.1 },
    { left: "80%", top: "30%", size: "4px", delay: 0.5 },
    { left: "14%", top: "58%", size: "5px", delay: 1.4 },
    { left: "30%", top: "66%", size: "4px", delay: 0.9 },
    { left: "48%", top: "74%", size: "6px", delay: 0.6 },
    { left: "64%", top: "62%", size: "4px", delay: 1.6 },
    { left: "78%", top: "70%", size: "5px", delay: 1.2 },
    { left: "90%", top: "56%", size: "4px", delay: 0.4 },
  ];

  if (ornamentStyle === "minimal" || ornamentStyle === "geometric") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, ${primary}22 0%, transparent 45%, ${accent}22 100%)`,
          }}
        />
        <motion.div
          className="absolute -top-24 -left-20 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${primary}33` }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${accent}2E` }}
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.45, 0.2, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (isIslamic && ornamentStyle !== "jawa" && ornamentStyle !== "minang") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
        {/* Soft aura layers */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 18%, ${accent}22 0%, transparent 52%),
              radial-gradient(circle at 18% 80%, ${primary}18 0%, transparent 56%),
              radial-gradient(circle at 82% 78%, ${secondary}16 0%, transparent 60%)
            `,
          }}
        />

        {/* Pattern dots */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${primary}55 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Gentle moving shimmer */}
        <motion.div
          className="absolute -top-24 left-1/2 h-48 w-[140%] -translate-x-1/2 opacity-25"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0 16px, ${accent}26 16px 18px, transparent 18px 40px)`,
          }}
          animate={{ x: [0, 22, 0], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Crescent + star */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 opacity-65"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
            <path
              d="M98 12c-17.1 0-31 13.9-31 31s13.9 31 31 31c6.4 0 12.4-2 17.3-5.5C109.5 70.9 101.1 75 92 75 69.4 75 51 56.6 51 34S69.4-7 92-7c9.1 0 17.5 4.1 23.3 10.5C110.4 14 104.4 12 98 12Z"
              fill={`${primary}66`}
            />
            <path
              d="M131 26l3.4 7 7.7 1.1-5.6 5.4 1.3 7.6-6.8-3.6-6.8 3.6 1.3-7.6-5.6-5.4 7.7-1.1 3.4-7Z"
              fill={`${accent}88`}
            />
          </svg>
        </motion.div>

        {/* Mosque silhouette bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 md:h-24 opacity-45"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
        >
          <svg viewBox="0 0 1200 220" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M0 220V165h90v-22c0-18 12-34 28-40v-10h26v10c16 6 28 22 28 40v22h70v-34c0-42 28-78 66-90v-14h40v14c38 12 66 48 66 90v34h86v-18c0-28 19-52 46-60V62h28v15c27 8 46 32 46 60v18h96v-50c0-58 39-107 92-123V0h46v9c53 16 92 65 92 123v50h96v-18c0-28 19-52 46-60V62h28v15c27 8 46 32 46 60v18h86v-34c0-42 28-78 66-90v-14h40v14c38 12 66 48 66 90v34h70v-22c0-18 12-34 28-40v-10h26v10c16 6 28 22 28 40v22h90v55H0Z"
              fill={primary}
              opacity="0.75"
            />
            <path d="M0 220V196h1200v24H0Z" fill={accent} opacity="0.35" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (ornamentStyle === "batik") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${accent}66 1px, transparent 0), radial-gradient(circle at 14px 14px, ${primary}66 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <motion.div
          className="absolute inset-x-0 top-16 h-40 opacity-35"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, transparent 0 14px, ${primary}33 14px 18px, transparent 18px 32px)`,
          }}
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-10 h-44 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(-135deg, transparent 0 10px, ${accent}30 10px 14px, transparent 14px 28px)`,
          }}
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  if (ornamentStyle === "celestial") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${secondary}22 0%, transparent 45%), radial-gradient(circle at 80% 70%, ${accent}22 0%, transparent 55%)`,
          }}
        />
        <motion.div
          className="absolute top-[18%] left-[22%] h-2 w-2 rounded-full"
          style={{ backgroundColor: "#FFFFFFA6" }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[38%] right-[20%] h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "#FFFFFF99" }}
          animate={{ opacity: [0.3, 0.95, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.div
          className="absolute bottom-[24%] left-[35%] h-1 w-1 rounded-full"
          style={{ backgroundColor: "#FFFFFF8C" }}
          animate={{ opacity: [0.25, 0.8, 0.25], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    );
  }

  if (ornamentStyle === "minang") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 18%, ${accent}26 0%, transparent 42%),
              radial-gradient(circle at 50% 78%, ${accent}1A 0%, transparent 50%),
              linear-gradient(180deg, ${primary}38 0%, transparent 45%, ${primary}24 100%)
            `,
          }}
        />
        <motion.div
          className="absolute -top-12 left-1/2 h-40 w-[140%] -translate-x-1/2"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0 14px, ${accent}26 14px 16px, transparent 16px 34px)`,
          }}
          animate={{ x: [0, 22, 0], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-1 w-10 text-white/70 md:left-4 md:w-14"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MarawaFlags side="left" accent={accent} />
        </motion.div>
        <motion.div
          className="absolute top-0 right-1 w-10 text-white/70 md:right-4 md:w-14"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <MarawaFlags side="right" accent={accent} />
        </motion.div>
        <motion.div
          className="absolute top-5 left-5 w-20 text-white/75"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MinangCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute top-5 right-5 w-20 -scale-x-100 text-white/75"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <MinangCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute bottom-5 left-5 w-20 rotate-180 text-white/75"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        >
          <MinangCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute bottom-5 right-5 w-20 rotate-180 text-white/75"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MinangCornerFlourish accent={accent} />
        </motion.div>
        {shimmerDots.map((dot, idx) => (
          <motion.div
            key={`minang-dot-${idx}`}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: `${accent}B3`,
              boxShadow: `0 0 12px ${accent}99`,
            }}
            animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 3.2,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-[38%] h-px w-[72%] -translate-x-1/2"
          style={{ backgroundColor: `${accent}7A` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.9, 1, 0.9] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[42%] h-px w-[52%] -translate-x-1/2"
          style={{ backgroundColor: `${accent}66` }}
          animate={{ opacity: [0.1, 0.5, 0.1], scaleX: [0.86, 1, 0.86] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-14 md:h-20 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ color: "#2B1407" }}
        >
          <RumahGadangRoof color="#2B1407" accent={accent} className="h-full w-full" />
        </motion.div>
      </div>
    );
  }

  if (ornamentStyle === "jawa") {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 15%, ${accent}22 0%, transparent 45%),
              radial-gradient(circle at 50% 85%, ${primary}1A 0%, transparent 50%),
              linear-gradient(180deg, transparent 0%, ${primary}15 100%)
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='18' stroke='%23${accent.replace("#", "")}' stroke-width='0.8' opacity='0.25' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-28 md:w-36 opacity-55"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Gunungan color={primary} accent={accent} />
        </motion.div>

        <motion.div
          className="absolute top-3 left-3 w-12 md:w-16"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <JawaCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute top-3 right-3 w-12 md:w-16 -scale-x-100"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <JawaCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-3 w-12 md:w-16 rotate-180"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        >
          <JawaCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute bottom-16 right-3 w-12 md:w-16 -scale-x-100 rotate-180"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <JawaCornerFlourish accent={accent} />
        </motion.div>

        <motion.div
          className="absolute top-2 left-10 w-12 md:w-16 opacity-45"
          animate={{ x: [0, 4, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <WayangSilhouette side="left" color={primary} />
        </motion.div>
        <motion.div
          className="absolute top-2 right-10 w-12 md:w-16 opacity-45"
          animate={{ x: [0, -4, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <WayangSilhouette side="right" color={primary} />
        </motion.div>

        {shimmerDots.map((dot, idx) => (
          <motion.div
            key={`jawa-dot-${idx}`}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: `${accent}B3`,
              boxShadow: `0 0 12px ${accent}99`,
            }}
            animate={{ opacity: [0.1, 0.75, 0.1], scale: [0.8, 1.3, 0.8] }}
            transition={{
              duration: 3.5,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 md:h-24 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <CandiSilhouette color={primary} accent={accent} className="h-full w-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ opacity: layerOpacity }}>
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${primary}22 0%, transparent 55%), radial-gradient(circle at 70% 75%, ${accent}22 0%, transparent 58%)`,
        }}
      />
      <motion.div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 0 46%, ${accent}22 50%, transparent 54%, transparent 100%)`,
        }}
        animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
