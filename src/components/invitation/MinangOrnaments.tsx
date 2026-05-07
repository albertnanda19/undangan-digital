"use client";

import { motion } from "framer-motion";

type ColorProps = { color?: string; accent?: string; className?: string };

export function MinangCoupleSilhouette({ color = "currentColor", accent = "#D4AC0D", className }: ColorProps) {
  return (
    <svg
      viewBox="0 0 360 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Pasangan adat Minang"
    >
      <defs>
        <linearGradient id="minangBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="minangAccentGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="minangAuraGrad" cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="180" cy="170" rx="156" ry="124" fill="url(#minangAuraGrad)" />

      {/* Groom silhouette with saluak */}
      <g transform="translate(66 34)">
        <path d="M20 28 C 24 8, 96 8, 100 28 C 96 44, 24 44, 20 28 Z" fill="url(#minangAccentGrad)" />
        <path d="M30 28 Q 60 16 90 28" stroke={color} strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
        <ellipse cx="60" cy="58" rx="19" ry="23" fill={color} fillOpacity="0.9" />
        <path d="M54 80 L66 80 L70 92 L50 92 Z" fill={color} fillOpacity="0.85" />
        <path d="M22 108 Q 60 90 98 108 L104 200 Q 60 214 16 200 Z" fill="url(#minangBodyGrad)" />
        <path d="M34 118 Q 60 108 86 118" stroke={accent} strokeOpacity="0.8" strokeWidth="1.6" fill="none" />
        <path d="M34 146 Q 60 136 86 146" stroke={accent} strokeOpacity="0.6" strokeWidth="1.2" fill="none" />
        <path d="M34 174 Q 60 164 86 174" stroke={accent} strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
        <path d="M20 198 Q 60 188 100 198 L96 210 Q 60 220 24 210 Z" fill={color} fillOpacity="0.5" />
      </g>

      {/* Bride silhouette with suntiang */}
      <g transform="translate(194 20)">
        <g fill="url(#minangAccentGrad)" stroke={accent} strokeOpacity="0.45" strokeWidth="0.5">
          <path d="M18 52 Q 60 38 102 52 Q 60 58 18 52 Z" />
          <path d="M14 40 Q 60 24 106 40 Q 60 48 14 40 Z" />
          <path d="M10 28 Q 60 10 110 28 Q 60 38 10 28 Z" />
          <path d="M6 16 Q 60 -4 114 16 Q 60 26 6 16 Z" />
        </g>
        <path d="M24 64 Q 60 84 96 64 L94 88 Q 60 106 26 88 Z" fill={accent} fillOpacity="0.35" />
        <ellipse cx="60" cy="78" rx="18" ry="22" fill={color} fillOpacity="0.9" />
        <path d="M54 100 L66 100 L70 112 L50 112 Z" fill={color} fillOpacity="0.85" />
        <path d="M22 126 Q 60 108 98 126 L106 220 Q 60 236 14 220 Z" fill="url(#minangBodyGrad)" />
        <path d="M32 138 Q 60 126 88 138" stroke={accent} strokeOpacity="0.82" strokeWidth="1.6" fill="none" />
        <path d="M30 168 Q 60 156 90 168" stroke={accent} strokeOpacity="0.62" strokeWidth="1.2" fill="none" />
        <path d="M28 196 Q 60 184 92 196" stroke={accent} strokeOpacity="0.52" strokeWidth="1.2" fill="none" />
        <path d="M20 218 Q 60 206 100 218 L94 230 Q 60 240 26 230 Z" fill={color} fillOpacity="0.5" />
      </g>

      <path d="M120 228 Q 180 212 240 228" stroke={accent} strokeOpacity="0.4" strokeWidth="1.2" fill="none" />
      <path d="M104 244 Q 180 226 256 244" stroke={accent} strokeOpacity="0.25" strokeWidth="1.1" fill="none" />
      <ellipse cx="180" cy="306" rx="120" ry="6" fill={color} fillOpacity="0.12" />
    </svg>
  );
}

export function MarawaFlags({ color = "currentColor", accent = "#D4AC0D", side = "left", className }: ColorProps & { side?: "left" | "right" }) {
  const flip = side === "right" ? -1 : 1;
  return (
    <svg
      viewBox="0 0 120 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `scaleX(${flip})` }}
      role="img"
      aria-hidden="true"
    >
      {/* Pole */}
      <line x1="14" y1="0" x2="14" y2="220" stroke={color} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="6" r="4" fill={accent} />

      {/* Triangular pennants stacked vertically */}
      <motion.g
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "14px 0px" }}
      >
        <polygon points="14,16 88,30 14,44" fill={accent} fillOpacity="0.85" />
        <polygon points="14,52 78,66 14,80" fill={color} fillOpacity="0.55" />
        <polygon points="14,88 92,102 14,116" fill={accent} fillOpacity="0.7" />
        <polygon points="14,124 70,138 14,152" fill={color} fillOpacity="0.45" />
        <polygon points="14,160 84,174 14,188" fill={accent} fillOpacity="0.6" />
      </motion.g>
    </svg>
  );
}

export function RumahGadangRoof({ color = "currentColor", accent = "#D4AC0D", className }: ColorProps) {
  return (
    <svg
      viewBox="0 0 1200 140"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      role="img"
      aria-hidden="true"
    >
      {/* Five gonjong peaks */}
      <g fill={color} fillOpacity="0.85">
        <path d="M40 140 Q 80 60 120 30 Q 160 70 180 140 Z" />
        <path d="M260 140 Q 320 50 380 12 Q 440 60 460 140 Z" />
        <path d="M540 140 Q 600 30 660 -4 Q 720 30 740 140 Z" />
        <path d="M820 140 Q 880 60 940 12 Q 1000 50 1020 140 Z" />
        <path d="M1100 140 Q 1140 60 1170 30 Q 1190 70 1210 140 Z" />
      </g>
      {/* Accent ridges */}
      <g stroke={accent} strokeOpacity="0.85" strokeWidth="1.6" fill="none">
        <path d="M82 130 Q 120 50 158 130" />
        <path d="M286 130 Q 380 18 432 130" />
        <path d="M566 130 Q 660 -2 712 130" />
        <path d="M846 130 Q 940 18 992 130" />
        <path d="M1116 130 Q 1170 50 1196 130" />
      </g>
      {/* Tabuik horizontal beam */}
      <rect x="20" y="124" width="1160" height="4" fill={color} fillOpacity="0.6" />
      <rect x="20" y="132" width="1160" height="2" fill={accent} fillOpacity="0.6" />
    </svg>
  );
}

export function MinangCornerFlourish({ color = "currentColor", accent = "#D4AC0D", className }: ColorProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {/* Itiak pulang patang motif — flowing curl */}
      <path
        d="M4 110 Q 30 90 30 60 Q 30 30 60 30 Q 90 30 90 60 Q 90 90 116 92"
        stroke={accent}
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M14 116 Q 38 100 38 70 Q 38 44 60 44 Q 84 44 84 70 Q 84 100 110 110"
        stroke={color}
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />
      {/* Decorative dots */}
      <circle cx="30" cy="60" r="2.4" fill={accent} />
      <circle cx="60" cy="30" r="2.4" fill={accent} />
      <circle cx="90" cy="60" r="2.4" fill={accent} />
      <circle cx="60" cy="44" r="1.8" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

export function MinangSaluakBadge({ color = "currentColor", accent = "#D4AC0D", className }: ColorProps) {
  return (
    <svg
      viewBox="0 0 80 36"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Saluak"
    >
      <path
        d="M6 30 C 6 12, 74 12, 74 30 C 78 22, 80 28, 76 32 C 72 36, 66 36, 64 32 C 60 36, 20 36, 16 32 C 14 36, 8 36, 4 32 C 0 28, 2 22, 6 30 Z"
        fill={accent}
      />
      <path d="M12 32 Q 40 22 68 32" stroke={color} strokeOpacity="0.4" strokeWidth="1.2" fill="none" />
      <path d="M18 34 Q 40 28 62 34" stroke={color} strokeOpacity="0.4" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function MinangSuntiangBadge({ color = "currentColor", accent = "#D4AC0D", className }: ColorProps) {
  return (
    <svg
      viewBox="0 0 80 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Suntiang"
    >
      <g fill={accent} stroke={accent} strokeOpacity="0.6" strokeWidth="0.6">
        <path d="M12 38 Q 40 32 68 38 Q 40 42 12 38 Z" />
        <path d="M10 30 Q 40 22 70 30 Q 40 36 10 30 Z" />
        <path d="M8 22 Q 40 12 72 22 Q 40 28 8 22 Z" />
        <path d="M6 14 Q 40 2 74 14 Q 40 20 6 14 Z" />
      </g>
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={`b1-${i}`} cx={14 + i * 6.5} cy={36} r="0.9" fill={color} fillOpacity="0.55" />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <circle key={`b2-${i}`} cx={12 + i * 5.6} cy={28} r="0.9" fill={color} fillOpacity="0.55" />
      ))}
      {Array.from({ length: 13 }).map((_, i) => (
        <circle key={`b3-${i}`} cx={10 + i * 5} cy={20} r="0.9" fill={color} fillOpacity="0.55" />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <circle key={`b4-${i}`} cx={8 + i * 4.5} cy={12} r="0.9" fill={color} fillOpacity="0.55" />
      ))}
    </svg>
  );
}
