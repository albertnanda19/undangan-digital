"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  musicUrl?: string;
  autoPlayAudio?: HTMLAudioElement | null;
}

export function MusicPlayer({ musicUrl, autoPlayAudio }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayAudio) {
      audioRef.current = autoPlayAudio;
      autoPlayAudio.loop = true;
      autoPlayAudio.volume = 0.5;
      autoPlayAudio.onplay = () => setIsPlaying(true);
      autoPlayAudio.onpause = () => setIsPlaying(false);
      if (!autoPlayAudio.paused) setIsPlaying(true);
    } else if (musicUrl && !audioRef.current) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audioRef.current = audio;
    }

    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => {
      clearTimeout(timer);
      if (!autoPlayAudio && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [musicUrl, autoPlayAudio]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  if (!musicUrl && !autoPlayAudio) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110",
          isPlaying && "ring-2 ring-offset-2 ring-pink-300 animate-pulse"
        )}
        aria-label={isPlaying ? "Pause musik" : "Play musik"}
      >
        {isPlaying ? (
          <Music className="h-5 w-5 text-pink-500 animate-spin" style={{ animationDuration: "3s" }} />
        ) : (
          <Play className="h-5 w-5 text-gray-600" />
        )}
      </button>
      {showHint && (
        <span className="text-xs bg-white/90 rounded-full px-3 py-1 shadow text-gray-600">
          {isPlaying ? "Musik" : "Tap untuk play"}
        </span>
      )}
    </div>
  );
}
