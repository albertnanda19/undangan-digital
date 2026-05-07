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
        <linearGradient id="minangBodyDeepGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
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

      <ellipse cx="180" cy="168" rx="154" ry="122" fill="url(#minangAuraGrad)" />

      <g transform="translate(70 30)">
        <path
          d="M30 38 C 30 18, 90 18, 90 38 C 96 28, 100 36, 96 44 C 92 50, 86 50, 84 46 C 80 50, 40 50, 36 46 C 34 50, 28 50, 24 44 C 20 36, 24 28, 30 38 Z"
          fill="url(#minangAccentGrad)"
        />
        <path
          d="M34 40 Q 60 30 86 40"
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M40 44 Q 60 36 80 44"
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse cx="60" cy="68" rx="22" ry="26" fill="url(#minangBodyGrad)" />
        <rect x="54" y="92" width="12" height="10" fill="url(#minangBodyGrad)" />
        <path
          d="M28 110 Q 60 100 92 110 L 100 200 Q 60 210 20 200 Z"
          fill="url(#minangBodyGrad)"
        />
        <path d="M18 198 Q 60 188 102 198 L 100 208 Q 60 216 20 208 Z" fill="url(#minangBodyDeepGrad)" />
        <path d="M20 146 Q 60 138 100 146" stroke={color} strokeOpacity="0.2" strokeWidth="1.4" fill="none" />
        <path d="M20 170 Q 60 162 100 170" stroke={color} strokeOpacity="0.2" strokeWidth="1.4" fill="none" />
        <path
          d="M52 110 L 56 200"
          stroke={accent}
          strokeOpacity="0.85"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M68 110 L 64 200"
          stroke={accent}
          strokeOpacity="0.85"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="60" cy="130" r="2.4" fill={accent} />
        <circle cx="60" cy="148" r="2.4" fill={accent} />
        <circle cx="60" cy="166" r="2.4" fill={accent} />
        <circle cx="60" cy="184" r="2.4" fill={accent} />
        <path d="M34 106 Q 60 98 86 106" stroke={accent} strokeOpacity="0.65" strokeWidth="1" fill="none" />
      </g>

      <g transform="translate(200 16)">
        <path
          d="M22 56 Q 60 64 98 56 L 98 62 Q 60 70 22 62 Z"
          fill="url(#minangAccentGrad)"
        />
        <g fill="url(#minangAccentGrad)" stroke={accent} strokeOpacity="0.5" strokeWidth="0.6">
          <path d="M28 50 Q 60 40 92 50 Q 60 56 28 50 Z" />
          <path d="M24 38 Q 60 26 96 38 Q 60 46 24 38 Z" />
          <path d="M22 26 Q 60 12 98 26 Q 60 34 22 26 Z" />
          <path d="M20 14 Q 60 -2 100 14 Q 60 22 20 14 Z" />
        </g>
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={`s1-${i}`} cx={28 + i * 8} cy={48} r="1.4" fill={color} fillOpacity="0.55" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={`s2-${i}`} cx={22 + i * 7.6} cy={36} r="1.4" fill={color} fillOpacity="0.55" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <circle key={`s3-${i}`} cx={20 + i * 6.6} cy={24} r="1.4" fill={color} fillOpacity="0.55" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <circle key={`s4-${i}`} cx={18 + i * 6} cy={12} r="1.4" fill={color} fillOpacity="0.55" />
        ))}
        <path
          d="M30 66 Q 60 84 90 66 L 92 96 Q 60 110 28 96 Z"
          fill="url(#minangAccentGrad)"
          fillOpacity="0.55"
        />
        <ellipse cx="60" cy="86" rx="20" ry="24" fill="url(#minangBodyGrad)" />
        <path
          d="M30 124 Q 60 114 90 124 L 100 220 Q 60 230 20 220 Z"
          fill="url(#minangBodyGrad)"
        />
        <path d="M22 218 Q 60 208 98 218 L 96 228 Q 60 236 24 228 Z" fill="url(#minangBodyDeepGrad)" />
        <path
          d="M40 130 Q 60 124 80 130"
          stroke={accent}
          strokeOpacity="0.9"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M30 160 Q 60 152 90 160"
          stroke={accent}
          strokeOpacity="0.7"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M28 190 Q 60 182 92 190"
          stroke={accent}
          strokeOpacity="0.7"
          strokeWidth="1.4"
          fill="none"
        />
        <path d="M28 174 Q 60 166 92 174" stroke={color} strokeOpacity="0.2" strokeWidth="1.4" fill="none" />
        <path d="M26 204 Q 60 196 94 204" stroke={color} strokeOpacity="0.2" strokeWidth="1.4" fill="none" />
        <circle cx="60" cy="144" r="2" fill={accent} fillOpacity="0.8" />
        <circle cx="60" cy="160" r="2" fill={accent} fillOpacity="0.8" />
        <circle cx="60" cy="176" r="2" fill={accent} fillOpacity="0.8" />
      </g>

      <path d="M122 220 Q 180 206 238 220" stroke={accent} strokeOpacity="0.35" strokeWidth="1.1" fill="none" />
      <path d="M106 236 Q 180 220 254 236" stroke={accent} strokeOpacity="0.25" strokeWidth="1.1" fill="none" />
      <g fill={accent} fillOpacity="0.6">
        <circle cx="180" cy="68" r="2" />
        <circle cx="146" cy="80" r="1.5" />
        <circle cx="214" cy="80" r="1.5" />
      </g>
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
