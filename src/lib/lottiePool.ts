export type LottiePoolEntry = {
  url: string;
  description: string;
  backgroundColor?: string;
};

export const LOTTIE_POOL: Record<string, LottiePoolEntry[]> = {
  sakura: [
    { url: "https://lottie.host/15526ec3-bfdd-4ed2-a874-f912f851d8ff/ScL9wQfSaQ.json", description: "Romantic couple pink wedding" },
    { url: "https://lottie.host/8f1ec96a-a11d-4d06-a895-9ca8b5ea6e1e/rYFsB6qVdB.json", description: "Love hearts pink" },
    { url: "https://lottie.host/6f4464d0-06cb-4d6a-b9be-e579fca16f9a/Uh8GfIg17D.json", description: "Flowers blooming" },
  ],
  "ivory-elegance": [
    { url: "https://lottie.host/7785ee74-a381-4237-bf1d-c93cb56f1936/Csi8n4s8cv.json", description: "Elegant wedding rings couple" },
    { url: "https://lottie.host/e46bc5ba-a0d9-4954-a1ee-a45a32246bb0/zjNV2zPlEt.json", description: "Elegant silhouette" },
    { url: "https://lottie.host/bf08e7fc-70b5-4f5a-9dd8-03f7b69b11fb/wI3agk4oWG.json", description: "Candles elegant" },
  ],
  botanical: [
    { url: "https://lottie.host/327d9b53-c95f-43f0-9de2-8b7f8ef627f4/lJzlbQROQp.json", description: "Nature flowers wedding" },
    { url: "https://lottie.host/588973f4-a1e8-4a1b-8d03-af95f8eb78fd/8sYpmm6wQ9.json", description: "Botanical leaves" },
    { url: "https://lottie.host/4f08f6fe-5e3f-45a7-a878-f8a862f1f456/yN8As0XvPG.json", description: "Garden wedding" },
  ],
  "celestial-dark": [
    { url: "https://lottie.host/4914a95e-9144-4cb2-9720-fbaa99fd2707/5sRx0mgJ7R.json", description: "Stars night galaxy" },
    { url: "https://lottie.host/8f3a4bf2-f164-4fd4-a952-75d20f220f66/K3m1kgF6B2.json", description: "Moon sparkles" },
    { url: "https://lottie.host/03a89863-3a66-4abd-b8ca-b6e50d66f3fe/RSBgH9A1jP.json", description: "Sky particles" },
  ],
  "batik-heritage": [
    { url: "https://lottie.host/c5f60d56-f38e-4f62-8b52-f9e211cb89e8/kV8jLQxN84.json", description: "Traditional ornament decoration" },
    { url: "https://lottie.host/4125345d-fddd-4caf-a6f4-944cf4cbcfe4/uQJHg5UA4J.json", description: "Cultural pattern" },
    { url: "https://lottie.host/d9d402f5-f861-41e7-a7e8-5f3db9b7f3ca/uL9NhQxV5R.json", description: "Heritage decoration" },
  ],
  minang: [
    { url: "https://lottie.host/c5f60d56-f38e-4f62-8b52-f9e211cb89e8/kV8jLQxN84.json", description: "Heritage ornament motif" },
    { url: "https://lottie.host/4125345d-fddd-4caf-a6f4-944cf4cbcfe4/uQJHg5UA4J.json", description: "Cultural Minang pattern" },
    { url: "https://lottie.host/6f4464d0-06cb-4d6a-b9be-e579fca16f9a/Uh8GfIg17D.json", description: "Floral bloom for cultural ceremony" },
  ],
  jawa: [
    { url: "https://lottie.host/c5f60d56-f38e-4f62-8b52-f9e211cb89e8/kV8jLQxN84.json", description: "Traditional Javanese ornament" },
    { url: "https://lottie.host/4125345d-fddd-4caf-a6f4-944cf4cbcfe4/uQJHg5UA4J.json", description: "Javanese cultural pattern" },
    { url: "https://lottie.host/6f4464d0-06cb-4d6a-b9be-e579fca16f9a/Uh8GfIg17D.json", description: "Floral bloom Javanese ceremony" },
  ],
};

export const LOTTIE_FALLBACK: LottiePoolEntry[] = [
  { url: "https://lottie.host/15526ec3-bfdd-4ed2-a874-f912f851d8ff/ScL9wQfSaQ.json", description: "Wedding couple universal" },
  { url: "https://lottie.host/8f1ec96a-a11d-4d06-a895-9ca8b5ea6e1e/rYFsB6qVdB.json", description: "Love hearts universal" },
];

const THEME_ALIAS: Record<string, string> = {
  "00000000-0000-0000-0000-000000000001": "sakura",
  "00000000-0000-0000-0000-000000000002": "ivory-elegance",
  "00000000-0000-0000-0000-000000000003": "botanical",
  "00000000-0000-0000-0000-000000000004": "celestial-dark",
  "00000000-0000-0000-0000-000000000005": "batik-heritage",
  "00000000-0000-0000-0000-000000000006": "minang",
  "00000000-0000-0000-0000-000000000007": "jawa",
};

function resolveThemeKey(themeId: string): string {
  return THEME_ALIAS[themeId] || themeId;
}

export function getRandomLottieForTheme(themeId: string): LottiePoolEntry {
  const pool = LOTTIE_POOL[resolveThemeKey(themeId)] ?? LOTTIE_FALLBACK;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function getSeededLottieForTheme(themeId: string, seed: string): LottiePoolEntry {
  const pool = LOTTIE_POOL[resolveThemeKey(themeId)] ?? LOTTIE_FALLBACK;
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % pool.length;
  return pool[index];
}
