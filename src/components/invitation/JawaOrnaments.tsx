"use client";

import { motion } from "framer-motion";

type ColorProps = {
  color?: string;
  accent?: string;
  className?: string;
};

type SideProps = ColorProps & { side?: "left" | "right" };

// ================================================================
// GUNUNGAN — Tree of Life (Wayang), enhanced with gold details
// ================================================================
export function Gunungan({ color = "#1A1A1A", accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 400 500" fill="none" className={className} aria-hidden="true">
      <path d="M200 10c-18 32-32 70-40 110-12 48-32 76-66 98-34 22-62 54-76 96-14 42-10 86 10 120 20 34 52 58 98 74 22 8 46 12 74 14 28-2 52-6 74-14 46-16 78-40 98-74 20-34 24-78 10-120-14-42-42-74-76-96-34-22-54-50-66-98-8-40-22-78-40-110Z" fill={color} opacity="0.5" />
      <path d="M200 40c-14 28-26 60-32 94-10 40-26 64-54 82-28 18-52 46-64 82-12 36-8 72 8 100 16 28 44 48 82 60 18 6 38 10 60 12 22-2 42-6 60-12 38-12 66-32 82-60 16-28 20-64 8-100-12-36-36-64-64-82-28-18-44-42-54-82-6-34-18-66-32-94Z" fill={color} opacity="0.3" />
      <path d="M200 80c-10 20-18 44-22 68-8 32-20 50-40 64-20 14-38 36-48 62-10 26-6 54 4 76 10 22 28 38 48 46 10 4 22 6 36 8 12 0 24-2 36-8 20-8 38-24 48-46 10-22 14-50 4-76-10-26-28-48-48-62-20-14-32-32-40-64-4-24-12-48-22-68Z" fill={accent} opacity="0.4" />
      <path d="M192 200h16v100h-16z" fill={color} opacity="0.4" />
      <path d="M130 240c12-16 28-24 48-28M270 240c-12-16-28-24-48-28" stroke={accent} strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M110 290c16-18 38-30 60-34M290 290c-16-18-38-30-60-34" stroke={accent} strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M140 350c6-12 18-20 30-24M260 350c-6-12-18-20-30-24" stroke={accent} strokeWidth="2" fill="none" opacity="0.4" />
      <ellipse cx="200" cy="460" rx="60" ry="8" fill={color} opacity="0.2" />
      <path d="M160 420c12-8 28-12 40-12s28 4 40 12" stroke={accent} strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  );
}

// ================================================================
// CANDI SILHOUETTE — Enhanced with gold accents
// ================================================================
export function CandiSilhouette({ color = "#1A1A1A", accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 800 300" fill="none" className={className} aria-hidden="true">
      <path d="M60 300V250h20v-30h20v-22h16v-16h18v-10h20v-8h6v-6h8v-6h10v8h6v10h8v14h12v20h14v24h20v42H60Z" fill={color} opacity="0.5" />
      <path d="M180 300V240h16v-28h14v-20h12v-12h8v-8h6v-6h10v6h8v8h10v12h12v20h14v28h16v60H180Z" fill={color} opacity="0.6" />
      <path d="M340 300V260h20v-34h16v-24h12v-14h8v-8h4v-6h6v6h6v8h8v14h12v24h16v34h20v40H340Z" fill={color} opacity="0.55" />
      <path d="M440 300V260h20v-34h16v-24h12v-14h8v-8h4v-6h6v6h6v8h8v14h12v24h16v34h20v40H440Z" fill={color} opacity="0.55" />
      <path d="M580 300V240h16v-28h14v-20h12v-12h8v-8h6v-6h10v6h8v8h10v12h12v20h14v28h16v60H580Z" fill={color} opacity="0.6" />
      <path d="M720 300V250h20v-30h20v-22h16v-16h18v-10h20v-8h6v-6h8v-6h10v8h6v10h8v14h12v20h14v24h20v42H720Z" fill={color} opacity="0.5" />
      <path d="M390 300V230l10-8 10 8v70H390Z" fill={accent} opacity="0.5" />
      <path d="M0 300h800v-10H0v10Z" fill={accent} opacity="0.4" />
      <path d="M80 290h640v-6H80v6Z" fill={accent} opacity="0.25" />
      <circle cx="400" cy="210" r="4" fill={accent} opacity="0.6" />
    </svg>
  );
}

// ================================================================
// KEMBAR MAYANG — Traditional Javanese wedding janur decoration
// ================================================================
export function KembarMayang({ side = "left", accent = "#C9A96E", className }: SideProps) {
  const mirror = side === "right" ? "scale(-1, 1)" : "";
  return (
    <motion.svg
      viewBox="0 0 80 400"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ transformOrigin: "center top", transform: mirror }}
      animate={{ rotate: [0, 2, 0, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M40 20c-2 4 0 16 2 24 2 8-2 20-8 28-6 8-10 18-8 24 2 6 8 4 12 0" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M42 24c2 6 4 16 2 26-2 10 2 22 8 30 6 8 8 16 4 22" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M38 30c-4 8-6 18-4 26 2 8-2 18-6 26" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M44 36c4 6 6 16 4 24-2 8 2 16 6 22" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M35 80c-8 14-10 30-4 38 6 8 12 4 14-4" stroke={accent} strokeWidth="1" fill="none" opacity="0.35" />
      <path d="M47 82c6 12 8 28 2 36-6 8-12 6-12-2" stroke={accent} strokeWidth="1" fill="none" opacity="0.35" />
      <path d="M36 130c-6 12-8 26-2 32s12 2 14-6" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M46 128c4 10 6 24 0 30s-12 4-12-4" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M38 170c-4 8-6 18-2 22s10 0 12-6" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.25" />
      <path d="M44 168c2 6 4 16 0 20s-10 2-10-4" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.25" />
      <ellipse cx="40" cy="16" rx="6" ry="4" fill={accent} opacity="0.5" />
      <ellipse cx="40" cy="50" rx="4" ry="3" fill={accent} opacity="0.35" />
      <ellipse cx="40" cy="100" rx="3" ry="2.5" fill={accent} opacity="0.25" />
      <path d="M30 200c0 8 4 14 10 14s10-6 10-14" stroke={accent} strokeWidth="1" fill="none" opacity="0.2" />
    </motion.svg>
  );
}

// ================================================================
// AKSARA JAWA — Javanese script decorative element
// ================================================================
export function AksaraJawa({ text = "ha na ca ra ka", accent = "#C9A96E", className }: ColorProps & { text?: string }) {
  return (
    <svg viewBox="0 0 200 40" fill="none" className={className} aria-hidden="true">
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill={accent} opacity="0.7" fontSize="18" fontFamily="serif">
        {text}
      </text>
      <path d="M20 20h160" stroke={accent} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function AksaraJawaOrnament({ accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 120 30" fill="none" className={className} aria-hidden="true">
      <path d="M10 15c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8Z" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M32 15c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8Z" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M54 15c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8Z" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M76 15c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8Z" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M98 15c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8Z" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}

// ================================================================
// LUNG-LUNGAN — Traditional Javanese vine/floral divider
// ================================================================
export function LungLungan({ accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 200 30" fill="none" className={className} aria-hidden="true">
      <path d="M0 22c16-2 32-6 48-4s32 6 48 4 32-6 48-4 32 6 48 4" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M10 15c8-2 16-4 24-2s16 4 24 2 16-4 24-2 16 4 24 2 16-4 24-2 16 4 24 2" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="20" cy="18" r="3" fill={accent} opacity="0.35" />
      <circle cx="60" cy="20" r="2.5" fill={accent} opacity="0.3" />
      <circle cx="100" cy="18" r="3" fill={accent} opacity="0.35" />
      <circle cx="140" cy="20" r="2.5" fill={accent} opacity="0.3" />
      <circle cx="180" cy="18" r="3" fill={accent} opacity="0.35" />
      <path d="M20 6c4-3 10-4 14-2" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.25" />
      <path d="M100 6c4-3 10-4 14-2" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.25" />
      <path d="M60 8c3-2 8-3 11-1" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.2" />
      <path d="M140 8c3-2 8-3 11-1" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.2" />
    </svg>
  );
}

// ================================================================
// PENDOPO ARCH — Traditional Javanese pavilion archway
// ================================================================
export function PendopoArch({ color = "#1A1A1A", accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 800 200" fill="none" className={className} aria-hidden="true">
      <path d="M100 200V160c0-20 10-38 26-48l274-96 274 96c16 10 26 28 26 48v40H100Z" stroke={accent} strokeWidth="1.5" fill={color} opacity="0.25" />
      <path d="M120 200V162c0-16 8-30 22-38l258-88 258 88c14 8 22 22 22 38v38H120Z" stroke={accent} strokeWidth="1" fill={`${accent}15`} opacity="0.35" />
      <path d="M400 8c-6 0-12 2-16 6-4 4-6 10-6 16v36h44V30c0-6-2-12-6-16-4-4-10-6-16-6Z" fill={accent} opacity="0.45" />
      <path d="M400 8v52h44V30c0-6-2-12-6-16" fill={color} opacity="0.15" />
      <path d="M360 40l40-10 40 10v10h-80V40Z" fill={accent} opacity="0.3" />
      <path d="M300 80l100-30 100 30v10H300V80Z" fill={accent} opacity="0.2" />
      <path d="M240 120l160-40 160 40v10H240v-10Z" fill={accent} opacity="0.15" />
      <path d="M340 58c12-4 24-8 36-10 4-1 8 1 10 4l8 18H332l8-12Z" fill={accent} opacity="0.25" />
      <path d="M200 160l200-60 200 60" stroke={accent} strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M400 72v88" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.2" />
    </svg>
  );
}

// ================================================================
// BATIK SIDOMUKTI — Diamond pattern (wedding batik)
// ================================================================
export function BatikSidomukti({ color = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path d="M40 4l36 36-36 36L4 40 40 4Z" stroke={color} strokeWidth="0.6" opacity="0.12" fill="none" />
      <path d="M40 12l28 28-28 28-28-28 28-28Z" stroke={color} strokeWidth="0.5" opacity="0.1" fill="none" />
      <path d="M40 20l20 20-20 20-20-20 20-20Z" stroke={color} strokeWidth="0.4" opacity="0.08" fill="none" />
      <circle cx="40" cy="40" r="3" fill={color} opacity="0.15" />
      <circle cx="40" cy="12" r="2" fill={color} opacity="0.1" />
      <circle cx="40" cy="68" r="2" fill={color} opacity="0.1" />
      <circle cx="12" cy="40" r="2" fill={color} opacity="0.1" />
      <circle cx="68" cy="40" r="2" fill={color} opacity="0.1" />
    </svg>
  );
}

// ================================================================
// BATIK TRUNTUM — Star/bintang pattern (blossoming love)
// ================================================================
export function BatikTruntum({ color = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <circle cx="30" cy="30" r="12" stroke={color} strokeWidth="0.5" opacity="0.12" fill="none" />
      <circle cx="30" cy="30" r="6" stroke={color} strokeWidth="0.5" opacity="0.1" fill="none" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.15" />
      <path d="M18 30h24M30 18v24" stroke={color} strokeWidth="0.4" opacity="0.08" />
      <circle cx="6" cy="30" r="4" stroke={color} strokeWidth="0.4" opacity="0.08" fill="none" />
      <circle cx="54" cy="30" r="4" stroke={color} strokeWidth="0.4" opacity="0.08" fill="none" />
      <circle cx="30" cy="6" r="4" stroke={color} strokeWidth="0.4" opacity="0.08" fill="none" />
      <circle cx="30" cy="54" r="4" stroke={color} strokeWidth="0.4" opacity="0.08" fill="none" />
      <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="0.3" opacity="0.06" fill="none" />
      <circle cx="54" cy="6" r="3" stroke={color} strokeWidth="0.3" opacity="0.06" fill="none" />
      <circle cx="6" cy="54" r="3" stroke={color} strokeWidth="0.3" opacity="0.06" fill="none" />
      <circle cx="54" cy="54" r="3" stroke={color} strokeWidth="0.3" opacity="0.06" fill="none" />
    </svg>
  );
}

// ================================================================
// SOGAN BORDER — Classic Javanese sogan batik border frame
// ================================================================
export function SoganBorder({ color = "#5C3A21", accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="196" height="196" rx="8" stroke={accent} strokeWidth="1.5" opacity="0.5" fill="none" />
      <rect x="6" y="6" width="188" height="188" rx="6" stroke={color} strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M10 10l14-4M190 10l-14-4M10 190l14 4M190 190l-14 4" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="6" r="3" fill={accent} opacity="0.35" />
      <circle cx="100" cy="194" r="3" fill={accent} opacity="0.35" />
      <circle cx="6" cy="100" r="3" fill={accent} opacity="0.35" />
      <circle cx="194" cy="100" r="3" fill={accent} opacity="0.35" />
    </svg>
  );
}

// ================================================================
// WAYANG SILHOUETTE — Enhanced wayang with more detail
// ================================================================
export function WayangSilhouette({ side = "left", color = "#1A1A1A", className }: SideProps) {
  const mirror = side === "right" ? "scale(-1, 1)" : "";
  return (
    <svg viewBox="0 0 80 220" fill="none" className={className} aria-hidden="true" style={{ transform: mirror }}>
      <path d="M40 10c-6 0-12 4-14 10-2 6-2 14 0 22 2 8 0 16-4 22-4 6-6 14-4 22 2 8 6 14 12 18-2 6-4 14-4 24 0 14 2 24 6 30-2 4-4 8-4 14 0 8 4 14 10 18 6 4 14 4 22 0 8-4 12-10 12-18 0-6-2-10-4-14 4-6 6-16 6-30 0-10-2-18-4-24 6-4 10-10 12-18 2-8 0-16-4-22-4-6-6-14-4-22 2-8 2-16 0-22-2-6-8-10-14-10Z" fill={color} opacity="0.3" />
      <circle cx="40" cy="22" r="6" fill={color} opacity="0.2" />
      <path d="M34 30c0 4 3 8 6 8s6-4 6-8" stroke={color} strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M36 38c-2 4-2 10-2 16M44 38c2 4 2 10 2 16" stroke={color} strokeWidth="1" fill="none" opacity="0.15" />
    </svg>
  );
}

// ================================================================
// CORNER FLOURISH — Enhanced Javanese corner ornament
// ================================================================
export function JawaCornerFlourish({ accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path d="M6 72c16-4 28-16 30-32 2 16 14 28 30 30-16 2-28 14-30 30-2-16-14-28-30-30Z" fill={`${accent}50`} />
      <path d="M4 48c12-2 20-10 22-20 2 10 10 18 22 20-12 2-20 10-22 20-2-10-10-18-22-20Z" fill={`${accent}38`} />
      <path d="M2 32c8-2 14-8 16-14 2 6 8 12 16 14-8 2-14 8-16 14-2-6-8-12-16-14Z" fill={`${accent}25`} />
    </svg>
  );
}

// ================================================================
// JAWA COUPLE SILHOUETTE — Javanese traditional wedding couple
// ================================================================
export function JawaGroomSilhouette({ accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 100 200" fill="none" className={className} aria-hidden="true">
      <ellipse cx="50" cy="22" rx="16" ry="18" fill="#1A1A1A" opacity="0.25" />
      <path d="M34 22c0 8 8 16 16 16s16-8 16-16" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      <path d="M50 40c-12 0-22 4-28 12-6 8-8 20-6 32 2 12 6 22 10 28-2 6-4 14-4 22 0 14 4 26 10 34 6 8 14 12 24 12s18-4 24-12c6-8 10-20 10-34 0-8-2-16-4-22 4-6 8-16 10-28 2-12 0-24-6-32-6-8-16-12-28-12Z" fill="#1A1A1A" opacity="0.2" />
      <path d="M42 70c-4 6-8 16-10 26-2 10 0 18 4 22" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      <path d="M58 70c4 6 8 16 10 26 2 10 0 18-4 22" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      <circle cx="50" cy="18" r="3" fill={accent} opacity="0.2" />
    </svg>
  );
}

export function JawaBrideSilhouette({ accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 100 200" fill="none" className={className} aria-hidden="true">
      <ellipse cx="50" cy="22" rx="16" ry="18" fill="#1A1A1A" opacity="0.25" />
      <path d="M34 22c0 8 8 16 16 16s16-8 16-16" stroke={accent} strokeWidth="0.8" opacity="0.2" />
      <path d="M50 40c-12 0-22 4-28 12-6 8-8 20-6 32 2 12 6 22 10 28-2 6-4 14-4 22 0 14 4 26 10 34 6 8 14 12 24 12s18-4 24-12c6-8 10-20 10-34 0-8-2-16-4-22 4-6 8-16 10-28 2-12 0-24-6-32-6-8-16-12-28-12Z" fill="#1A1A1A" opacity="0.2" />
      <path d="M50 8c-6 0-10 4-10 8s4 8 10 8 10-4 10-8-4-8-10-8Z" fill={accent} opacity="0.15" />
      <path d="M42 70c-4 6-8 16-10 26-2 10 0 18 4 22" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      <path d="M58 70c4 6 8 16 10 26 2 10 0 18-4 22" stroke={accent} strokeWidth="0.8" opacity="0.15" />
      <circle cx="50" cy="18" r="3" fill={accent} opacity="0.2" />
      <path d="M36 44c-2 4-4 10-4 16" stroke={accent} strokeWidth="0.6" opacity="0.15" />
      <path d="M64 44c2 4 4 10 4 16" stroke={accent} strokeWidth="0.6" opacity="0.15" />
    </svg>
  );
}
