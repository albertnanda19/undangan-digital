"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  url: string;
  width?: number;
  height?: number;
  loop?: boolean;
  className?: string;
};

export function LottieAnimation({ url, width = 300, height = 300, loop = true, className }: Props) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setError(true));
  }, [url]);

  if (error || !animationData) return null;

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
