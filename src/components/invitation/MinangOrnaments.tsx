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
          <stop offset="0%" stopColor={color} stopOpacity="0.94" />
          <stop offset="100%" stopColor={color} stopOpacity="0.68" />
        </linearGradient>
        <linearGradient id="minangBodyGradSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.72" />
          <stop offset="100%" stopColor={color} stopOpacity="0.44" />
        </linearGradient>
        <linearGradient id="minangAccentGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.72" />
        </linearGradient>
        <radialGradient id="minangAuraGrad" cx="50%" cy="44%" r="64%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="minangSkinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2E6DA" />
          <stop offset="100%" stopColor="#DFC8B3" />
        </linearGradient>
        <linearGradient id="minangEmbroideryGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.88" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <ellipse cx="180" cy="172" rx="152" ry="122" fill="url(#minangAuraGrad)" />

      {/* Groom silhouette with royal saluak and fuller human anatomy */}
      <g transform="translate(58 30)">
        <path d="M22 30 C 30 8, 88 8, 100 30 C 94 44, 28 44, 22 30 Z" fill="url(#minangAccentGrad)" />
        <path d="M34 30 Q 61 18 88 30" stroke={color} strokeOpacity="0.32" strokeWidth="1.1" fill="none" />
        <path d="M32 34 Q 48 14 66 12 Q 82 14 92 32 Q 78 30 66 36 Q 52 32 32 34 Z" fill={color} fillOpacity="0.18" />

        <path
          d="M44 61 C 44 49, 51 40, 62 40 C 73 40, 80 49, 80 61 C 80 73, 75 82, 69 87 C 65 90, 59 90, 55 87 C 49 82, 44 73, 44 61 Z"
          fill="url(#minangSkinGrad)"
        />
        <path d="M46 56 Q 62 45 78 56 Q 72 49 62 49 Q 52 49 46 56 Z" fill={color} fillOpacity="0.14" />
        <path d="M50 59 Q 55 56 60 59" stroke={color} strokeOpacity="0.44" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M64 59 Q 69 56 74 59" stroke={color} strokeOpacity="0.44" strokeWidth="1" fill="none" strokeLinecap="round" />
        <ellipse cx="55.5" cy="61.5" rx="1.4" ry="1.7" fill={color} fillOpacity="0.6" />
        <ellipse cx="69.5" cy="61.5" rx="1.4" ry="1.7" fill={color} fillOpacity="0.6" />
        <path d="M62 64 L60.8 70 L63.2 70 Z" fill={color} fillOpacity="0.26" />
        <path d="M56.2 74.5 Q 62 78 67.8 74.5" stroke={color} strokeOpacity="0.44" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M51 86 Q 62 94 73 86 L70 102 Q 62 106 54 102 Z" fill={color} fillOpacity="0.7" />

        <path d="M18 114 Q 40 92 62 94 Q 84 92 106 114 L112 202 Q 62 224 12 202 Z" fill="url(#minangBodyGrad)" />
        <path d="M42 106 Q 62 116 82 106 L84 120 Q 62 132 40 120 Z" fill={accent} fillOpacity="0.22" />
        <path d="M32 128 Q 62 116 92 128" stroke={accent} strokeOpacity="0.78" strokeWidth="1.5" fill="none" />
        <path d="M30 154 Q 62 142 94 154" stroke={accent} strokeOpacity="0.58" strokeWidth="1.15" fill="none" />
        <path d="M28 178 Q 62 166 96 178" stroke={accent} strokeOpacity="0.42" strokeWidth="1.1" fill="none" />
        <path d="M26 136 Q 62 122 98 136" stroke="url(#minangEmbroideryGrad)" strokeWidth="1.05" fill="none" />
        <path d="M24 162 Q 62 148 100 162" stroke="url(#minangEmbroideryGrad)" strokeWidth="0.95" fill="none" />
        <path d="M22 188 Q 62 174 102 188" stroke="url(#minangEmbroideryGrad)" strokeWidth="0.95" fill="none" />
        <path d="M20 200 Q 62 188 104 200 L100 214 Q 62 228 24 214 Z" fill="url(#minangBodyGradSoft)" />
        <path d="M20 152 Q 10 176 12 200" stroke={color} strokeOpacity="0.3" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M104 152 Q 114 176 112 200" stroke={color} strokeOpacity="0.3" strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>

      {/* Bride silhouette with ornate suntiang tiers and rich textile details */}
      <g transform="translate(188 14)">
        <g fill="url(#minangAccentGrad)" stroke={accent} strokeOpacity="0.42" strokeWidth="0.5">
          <path d="M16 54 Q 58 40 100 54 Q 58 60 16 54 Z" />
          <path d="M12 42 Q 58 24 104 42 Q 58 50 12 42 Z" />
          <path d="M8 30 Q 58 10 108 30 Q 58 38 8 30 Z" />
          <path d="M4 18 Q 58 -4 112 18 Q 58 28 4 18 Z" />
        </g>
        <path d="M24 66 Q 58 86 92 66 L90 90 Q 58 108 26 90 Z" fill={accent} fillOpacity="0.3" />

        <path
          d="M40 79 C 40 67, 47 58, 58 58 C 69 58, 76 67, 76 79 C 76 92, 71 101, 65 106 C 62 109, 54 109, 51 106 C 45 101, 40 92, 40 79 Z"
          fill="url(#minangSkinGrad)"
        />
        <path d="M42 73 Q 58 62 74 73 Q 68 66 58 66 Q 48 66 42 73 Z" fill={color} fillOpacity="0.14" />
        <path d="M46 78 Q 51 74.8 56 78" stroke={color} strokeOpacity="0.4" strokeWidth="0.95" fill="none" strokeLinecap="round" />
        <path d="M60 78 Q 65 74.8 70 78" stroke={color} strokeOpacity="0.4" strokeWidth="0.95" fill="none" strokeLinecap="round" />
        <ellipse cx="50.8" cy="80.2" rx="1.3" ry="1.6" fill={color} fillOpacity="0.58" />
        <ellipse cx="65.2" cy="80.2" rx="1.3" ry="1.6" fill={color} fillOpacity="0.58" />
        <path d="M58 83 L57 88.6 L59 88.6 Z" fill={color} fillOpacity="0.24" />
        <path d="M52.5 93 Q 58 96.2 63.5 93" stroke={color} strokeOpacity="0.4" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M47 106 Q 58 114 69 106 L66 120 Q 58 124 50 120 Z" fill={color} fillOpacity="0.7" />

        <path d="M18 130 Q 38 112 58 114 Q 78 112 100 130 L108 222 Q 58 244 8 222 Z" fill="url(#minangBodyGrad)" />
        <path d="M36 124 Q 58 136 80 124 L82 140 Q 58 152 34 140 Z" fill={accent} fillOpacity="0.2" />
        <path d="M28 142 Q 58 130 88 142" stroke={accent} strokeOpacity="0.8" strokeWidth="1.5" fill="none" />
        <path d="M26 170 Q 58 158 90 170" stroke={accent} strokeOpacity="0.58" strokeWidth="1.15" fill="none" />
        <path d="M24 198 Q 58 186 92 198" stroke={accent} strokeOpacity="0.42" strokeWidth="1.1" fill="none" />
        <path d="M22 150 Q 58 136 94 150" stroke="url(#minangEmbroideryGrad)" strokeWidth="1.05" fill="none" />
        <path d="M20 178 Q 58 164 96 178" stroke="url(#minangEmbroideryGrad)" strokeWidth="0.95" fill="none" />
        <path d="M18 206 Q 58 192 98 206" stroke="url(#minangEmbroideryGrad)" strokeWidth="0.95" fill="none" />
        <path d="M16 220 Q 58 208 100 220 L94 234 Q 58 248 22 234 Z" fill="url(#minangBodyGradSoft)" />
        <path d="M18 160 Q 10 184 12 208" stroke={color} strokeOpacity="0.27" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <path d="M98 160 Q 106 184 104 208" stroke={color} strokeOpacity="0.27" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      </g>

      <path d="M118 230 Q 180 214 242 230" stroke={accent} strokeOpacity="0.38" strokeWidth="1.15" fill="none" />
      <path d="M104 246 Q 180 228 256 246" stroke={accent} strokeOpacity="0.24" strokeWidth="1.05" fill="none" />
      <ellipse cx="180" cy="306" rx="118" ry="6" fill={color} fillOpacity="0.11" />
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
