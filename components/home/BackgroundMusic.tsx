"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
  const audio = audioRef.current;

  if (!audio) return;

  audio.volume = 0.2;
  audio.loop = true;

  console.log("🎵 BackgroundMusic mounted");

  const unlock = async () => {
    try {
      await audio.play();
      console.log("✅ Music Started");
    } catch (e) {
      console.log("❌ Still blocked");
    }

    window.removeEventListener("pointerdown", unlock);
  };

  window.addEventListener("pointerdown", unlock);

  return () => {
    window.removeEventListener("pointerdown", unlock);
  };
}, []);

  return (
    <audio
        ref={audioRef}
        preload="auto"
    >
        <source
            src="/audio/bloom-theme.mp3"
            type="audio/mpeg"
        />
    </audio>
    );
}
