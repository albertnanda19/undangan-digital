"use client";

type ColorProps = {
  color?: string;
  accent?: string;
  className?: string;
};

export function Gunungan({ color = "#1A1A1A", accent, className }: ColorProps) {
  return (
    <svg viewBox="0 0 400 500" fill="none" className={className} aria-hidden="true">
      <path
        d="M200 20C180 60 160 100 155 140C140 180 120 200 90 220C60 240 35 270 25 310C15 350 20 390 40 420C60 450 90 470 130 480C150 484 170 486 200 488C230 486 250 484 270 480C310 470 340 450 360 420C380 390 385 350 375 310C365 270 340 240 310 220C280 200 260 180 245 140C240 100 220 60 200 20Z"
        fill={color}
        opacity="0.6"
      />
      <path
        d="M200 60C186 90 172 120 168 150C158 180 144 196 124 212C104 228 88 250 80 280C72 310 76 340 90 362C104 384 124 398 152 406C168 410 184 412 200 414C216 412 232 410 248 406C276 398 296 384 310 362C324 340 328 310 320 280C312 250 296 228 276 212C256 196 242 180 232 150C228 120 214 90 200 60Z"
        fill={color}
        opacity="0.35"
      />
      <path
        d="M200 100C192 120 184 138 181 158C175 180 166 192 154 204C142 216 133 234 128 254C123 274 126 296 136 314C146 332 160 344 178 350C186 352 193 354 200 356C207 354 214 352 222 350C240 344 254 332 264 314C274 296 277 274 272 254C267 234 258 216 246 204C234 192 225 180 219 158C216 138 208 120 200 100Z"
        fill={accent || "#C9A96E"}
        opacity="0.5"
      />
      <path
        d="M190 220h20v80h-20z"
        fill={color}
        opacity="0.5"
      />
      <path
        d="M140 250c8-12 20-20 34-24M260 250c-8-12-20-20-34-24"
        stroke={accent || "#C9A96E"}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M120 290c14-16 32-26 52-30M280 290c-14-16-32-26-52-30"
        stroke={accent || "#C9A96E"}
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M160 380c2-8 6-14 12-18M240 380c-2-8-6-14-12-18"
        stroke={accent || "#C9A96E"}
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export function CandiSilhouette({ color = "#1A1A1A", accent, className }: ColorProps) {
  return (
    <svg viewBox="0 0 800 300" fill="none" className={className} aria-hidden="true">
      <path d="M60 300V260h20v-30h20v-20h16v-14h18v-8h20v-6h6v-4h8v-4h10v6h6v8h8v10h12v16h14v20h20v36H60Z" fill={color} opacity="0.45" />
      <path d="M180 300V250h16v-24h14v-16h12v-10h8v-6h6v-4h10v4h8v6h10v10h12v16h14v24h16v50H180Z" fill={color} opacity="0.55" />
      <path d="M340 300V270h20v-30h16v-20h12v-12h8v-6h4v-4h6v4h6v6h8v12h12v20h16v30h20v30H340Z" fill={color} opacity="0.5" />
      <path d="M440 300V270h20v-30h16v-20h12v-12h8v-6h4v-4h6v4h6v6h8v12h12v20h16v30h20v30H440Z" fill={color} opacity="0.5" />
      <path d="M580 300V250h16v-24h14v-16h12v-10h8v-6h6v-4h10v4h8v6h10v10h12v16h14v24h16v50H580Z" fill={color} opacity="0.55" />
      <path d="M720 300V260h20v-30h20v-20h16v-14h18v-8h20v-6h6v-4h8v-4h10v6h6v8h8v10h12v16h14v20h20v36H720Z" fill={color} opacity="0.45" />
      <path d="M390 300V240l10-6 10 6v60H390Z" fill={accent || "#C9A96E"} opacity="0.4" />
      <path d="M0 300h800v-8H0v8Z" fill={accent || "#C9A96E"} opacity="0.35" />
      <path d="M100 292h600v-4H100v4Z" fill={accent || "#C9A96E"} opacity="0.2" />
    </svg>
  );
}

export function BatikKawungPattern({ color = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <circle cx="30" cy="30" r="18" stroke={color} strokeWidth="0.8" opacity="0.25" fill="none" />
      <circle cx="12" cy="30" r="10" stroke={color} strokeWidth="0.5" opacity="0.15" fill="none" />
      <circle cx="48" cy="30" r="10" stroke={color} strokeWidth="0.5" opacity="0.15" fill="none" />
      <circle cx="30" cy="12" r="10" stroke={color} strokeWidth="0.5" opacity="0.15" fill="none" />
      <circle cx="30" cy="48" r="10" stroke={color} strokeWidth="0.5" opacity="0.15" fill="none" />
      <circle cx="30" cy="30" r="6" stroke={color} strokeWidth="0.6" opacity="0.2" fill="none" />
    </svg>
  );
}

export function BatikParangPattern({ color = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M-20 120L120-20" stroke={color} strokeWidth="1.2" opacity="0.12" />
      <path d="M-10 120L120-10" stroke={color} strokeWidth="0.6" opacity="0.08" />
      <path d="M-30 120L120-30" stroke={color} strokeWidth="0.6" opacity="0.08" />
      <path d="M20 80l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
      <path d="M40 60l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
      <path d="M60 40l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
      <path d="M80 20l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
      <path d="M0 100l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
      <path d="M-20 120l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
      <path d="M100 0l10-10" stroke={color} strokeWidth="2" opacity="0.15" />
    </svg>
  );
}

export function WayangSilhouette({ side = "left", color = "#1A1A1A", className }: ColorProps & { side?: "left" | "right" }) {
  const mirror = side === "right" ? "scale(-1, 1)" : "";
  return (
    <svg viewBox="0 0 80 200" fill="none" className={className} aria-hidden="true" style={{ transform: mirror }}>
      <path
        d="M40 20c-4 0-8 2-10 6c-2 4-3 10-3 18c0 8 1 14 3 18c-4 2-8 6-10 12c-4 10-3 22 2 30c-2 4-4 10-4 16c0 12 4 20 10 24c-2 6-4 14-4 22c0 14 2 22 4 26c-2 2-4 6-4 10c0 6 2 10 6 12c4 2 10 2 18 0c8-2 14-6 18-12c4-6 6-14 6-24c0-8-1-14-4-18c6-8 8-18 6-28c-2-8-6-14-12-16c2-4 4-10 4-18c0-8-1-14-3-18c-2-4-6-6-10-6s-8 2-10 6c-2 4-3 10-3 18s1 14 3 18c-4 2-8 4-12 4s-8-2-12-4c2-4 3-10 3-18s-1-14-3-18c-2-4-6-6-10-6z"
        fill={color}
        opacity="0.35"
      />
      <path
        d="M36 34c-2 4-3 10-3 16M44 34c2 4 3 10 3 16"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  );
}

export function JawaCornerFlourish({ accent = "#C9A96E", className }: ColorProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path d="M8 72c14-4 24-14 26-28c2 14 12 24 26 26c-14 2-24 12-26 26c-2-14-12-24-26-26Z" fill={`${accent}55`} />
      <path d="M4 48c10-2 16-8 17-17c1 9 7 15 17 17c-10 1-16 7-17 17c-1-10-7-16-17-17Z" fill={`${accent}40`} />
      <path d="M2 34c6-2 10-6 11-12c1 6 5 10 11 12c-6 1-10 5-11 11c-1-6-5-10-11-11Z" fill={`${accent}30`} />
    </svg>
  );
}
