"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <div className="text-6xl">⚠️</div>
      <h2 className="text-xl font-semibold text-[#E2E8F0]">Terjadi Kesalahan</h2>
      <p className="text-[#94A3B8] text-sm max-w-md text-center">{error.message}</p>
      <Button onClick={reset} variant="outline">Coba Lagi</Button>
    </div>
  );
}
