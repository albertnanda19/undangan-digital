"use client";

import { motion } from "framer-motion";
import {
  MarawaFlags,
  MinangCornerFlourish,
  RumahGadangRoof,
} from "@/components/invitation/MinangOrnaments";

type OpeningThemeConfig = {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  ornamentStyle?: string;
};

type Props = {
  themeConfig: OpeningThemeConfig;
  hasCoverPhoto: boolean;
};

export function OpeningCoverDecorations({ themeConfig, hasCoverPhoto }: Props) {
  const ornamentStyle = themeConfig.ornamentStyle ?? "floral";
  const primary = themeConfig.primaryColor ?? "#E8748A";
  const secondary = themeConfig.secondaryColor ?? "#FDF2F8";
  const accent = themeConfig.accentColor ?? primary;
  const layerOpacity = hasCoverPhoto ? 0.55 : 0.9;

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
          className="absolute bottom-5 right-5 w-20 rotate-180 text-white/75"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MinangCornerFlourish accent={accent} />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-14 md:h-20 opacity-55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ color: "#2B1407" }}
        >
          <RumahGadangRoof color="#2B1407" accent={accent} className="h-full w-full" />
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
