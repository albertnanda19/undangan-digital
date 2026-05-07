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

      {/* Groom full-body */}
      <g transform="translate(50 18)">
        {/* saluak */}
        <path d="M30 30 C 42 8, 104 8, 118 30 C 110 46, 38 46, 30 30 Z" fill="url(#minangAccentGrad)" />
        <path d="M44 30 Q 74 18 104 30" stroke={color} strokeOpacity="0.3" strokeWidth="1.1" fill="none" />

        {/* head + face */}
        <path d="M58 62 C 58 48, 66 38, 76 38 C 86 38, 94 48, 94 62 C 94 76, 89 86, 83 91 C 79 94, 73 94, 69 91 C 63 86, 58 76, 58 62 Z" fill="url(#minangSkinGrad)" />
        <path d="M60 57 Q 76 45 92 57" fill={color} fillOpacity="0.12" />
        <ellipse cx="70" cy="62" rx="1.3" ry="1.6" fill={color} fillOpacity="0.55" />
        <ellipse cx="82" cy="62" rx="1.3" ry="1.6" fill={color} fillOpacity="0.55" />
        <path d="M76 65 L75 71 L77 71 Z" fill={color} fillOpacity="0.22" />
        <path d="M70 75 Q 76 78 82 75" stroke={color} strokeOpacity="0.38" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M68 90 L84 90 L88 104 L64 104 Z" fill={color} fillOpacity="0.68" />

        {/* torso and robe */}
        <path d="M40 120 Q 56 104 76 104 Q 96 104 112 120 L112 186 Q 76 204 40 186 Z" fill="url(#minangBodyGrad)" />
        <path d="M48 124 Q 76 136 104 124 L104 140 Q 76 152 48 140 Z" fill={accent} fillOpacity="0.2" />
        <path d="M50 146 Q 76 136 102 146" stroke={accent} strokeOpacity="0.76" strokeWidth="1.3" fill="none" />
        <path d="M48 166 Q 76 156 104 166" stroke={accent} strokeOpacity="0.54" strokeWidth="1.1" fill="none" />
        <path d="M46 184 Q 76 174 106 184" stroke={accent} strokeOpacity="0.4" strokeWidth="1" fill="none" />

        {/* arms */}
        <path d="M40 130 Q 24 152 24 184 Q 24 192 30 194 Q 38 190 40 180 Z" fill="url(#minangBodyGradSoft)" />
        <path d="M112 130 Q 128 152 128 184 Q 128 192 122 194 Q 114 190 112 180 Z" fill="url(#minangBodyGradSoft)" />

        {/* lower body / legs */}
        <path d="M44 186 Q 76 198 108 186 L104 236 Q 76 252 48 236 Z" fill="url(#minangBodyGradSoft)" />
        <path d="M58 238 Q 66 254 70 270 L62 270 Q 54 255 50 240 Z" fill={color} fillOpacity="0.46" />
        <path d="M94 238 Q 86 254 82 270 L90 270 Q 98 255 102 240 Z" fill={color} fillOpacity="0.46" />
      </g>

      {/* Bride full-body */}
      <g transform="translate(176 10)">
        {/* suntiang */}
        <g fill="url(#minangAccentGrad)" stroke={accent} strokeOpacity="0.42" strokeWidth="0.5">
          <path d="M24 58 Q 74 42 124 58 Q 74 64 24 58 Z" />
          <path d="M18 46 Q 74 28 130 46 Q 74 54 18 46 Z" />
          <path d="M12 34 Q 74 14 136 34 Q 74 42 12 34 Z" />
          <path d="M8 22 Q 74 0 140 22 Q 74 30 8 22 Z" />
        </g>
        <path d="M34 68 Q 74 90 114 68 L112 94 Q 74 112 36 94 Z" fill={accent} fillOpacity="0.28" />

        {/* head + face */}
        <path d="M56 84 C 56 68, 64 58, 74 58 C 84 58, 92 68, 92 84 C 92 98, 87 108, 81 114 C 77 117, 71 117, 67 114 C 61 108, 56 98, 56 84 Z" fill="url(#minangSkinGrad)" />
        <path d="M58 78 Q 74 66 90 78" fill={color} fillOpacity="0.11" />
        <ellipse cx="68" cy="84" rx="1.25" ry="1.55" fill={color} fillOpacity="0.52" />
        <ellipse cx="80" cy="84" rx="1.25" ry="1.55" fill={color} fillOpacity="0.52" />
        <path d="M74 87 L73 92.5 L75 92.5 Z" fill={color} fillOpacity="0.2" />
        <path d="M68 96 Q 74 99 80 96" stroke={color} strokeOpacity="0.36" strokeWidth="0.95" fill="none" strokeLinecap="round" />
        <path d="M66 112 L82 112 L86 126 L62 126 Z" fill={color} fillOpacity="0.66" />

        {/* torso and gown */}
        <path d="M34 138 Q 52 122 74 122 Q 96 122 114 138 L118 208 Q 74 230 30 208 Z" fill="url(#minangBodyGrad)" />
        <path d="M44 142 Q 74 156 104 142 L106 160 Q 74 174 42 160 Z" fill={accent} fillOpacity="0.2" />
        <path d="M44 166 Q 74 154 104 166" stroke={accent} strokeOpacity="0.78" strokeWidth="1.3" fill="none" />
        <path d="M42 188 Q 74 176 106 188" stroke={accent} strokeOpacity="0.56" strokeWidth="1.1" fill="none" />
        <path d="M40 208 Q 74 196 108 208" stroke={accent} strokeOpacity="0.42" strokeWidth="1" fill="none" />

        {/* sleeves/arms */}
        <path d="M34 148 Q 18 172 18 206 Q 18 214 24 216 Q 32 212 34 202 Z" fill="url(#minangBodyGradSoft)" />
        <path d="M114 148 Q 130 172 130 206 Q 130 214 124 216 Q 116 212 114 202 Z" fill="url(#minangBodyGradSoft)" />

        {/* lower body / legs */}
        <path d="M34 208 Q 74 224 114 208 L108 256 Q 74 274 40 256 Z" fill="url(#minangBodyGradSoft)" />
        <path d="M56 258 Q 64 274 68 292 L60 292 Q 52 276 48 260 Z" fill={color} fillOpacity="0.44" />
        <path d="M92 258 Q 84 274 80 292 L88 292 Q 96 276 100 260 Z" fill={color} fillOpacity="0.44" />
      </g>

      <path d="M112 254 Q 180 234 248 254" stroke={accent} strokeOpacity="0.34" strokeWidth="1.1" fill="none" />
      <path d="M98 272 Q 180 252 262 272" stroke={accent} strokeOpacity="0.22" strokeWidth="1" fill="none" />
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
