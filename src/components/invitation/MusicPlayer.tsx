"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  musicUrl?: string;
}

export function MusicPlayer({ musicUrl }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicUrl) return;

    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    tryPlay();

    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = "";
    };
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  if (!musicUrl) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110",
          isPlaying && "ring-2 ring-offset-2 ring-pink-300 animate-pulse"
        )}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Music className="h-5 w-5 text-pink-500 animate-spin" style={{ animationDuration: "3s" }} />
        ) : (
          <Play className="h-5 w-5 text-gray-600" />
        )}
      </button>
      {showHint && (
        <span className="text-xs bg-white/90 rounded-full px-3 py-1 shadow text-gray-600 animate-fade-in">
          Musik
        </span>
      )}
    </div>
  );
}
