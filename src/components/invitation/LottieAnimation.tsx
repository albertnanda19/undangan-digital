"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getSeededLottieForTheme } from "@/lib/lottiePool";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  manualUrl?: string;
  themeId?: string;
  tenantSlug?: string;
  width?: number;
  height?: number;
  loop?: boolean;
  className?: string;
  fallback?: React.ReactNode;
};

export function LottieAnimation({
  manualUrl,
  themeId,
  tenantSlug,
  width = 280,
  height = 280,
  loop = true,
  className,
  fallback = null,
}: Props) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let url: string | null = null;
    if (manualUrl) {
      url = manualUrl;
    } else if (themeId && tenantSlug) {
      url = getSeededLottieForTheme(themeId, tenantSlug).url;
    }
    if (!url) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [manualUrl, themeId, tenantSlug]);

  if (isLoading || hasError || !animationData) return <>{fallback}</>;

  return (
    <div className={className} style={{ width, height, margin: "0 auto" }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
}
