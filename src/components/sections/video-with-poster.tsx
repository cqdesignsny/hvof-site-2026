"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoWithPosterProps {
  src: string;
  posterSrc: string;
  posterAlt?: string;
  className?: string;
}

/**
 * Video with a custom poster + click-to-play yellow overlay.
 * Once the user clicks, the poster is hidden and the native video controls take over.
 */
export function VideoWithPoster({
  src,
  posterSrc,
  posterAlt = "Video preview",
  className = "",
}: VideoWithPosterProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    setPlaying(true);
    // Slight delay so the video element is rendered + has src
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* Autoplay restriction: native controls take over */
      });
    });
  }

  return (
    <div className={`card-image-outline relative aspect-video w-full overflow-hidden bg-black ${className}`}>
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={play}
          aria-label="Play video"
          className="group absolute inset-0 block"
        >
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            quality={85}
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-20 w-20 place-items-center rounded-full text-foreground transition-transform duration-200 group-hover:scale-110 md:h-28 md:w-28"
            style={{ backgroundColor: "var(--brand-yellow)", boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}
          >
            <Play className="h-8 w-8 fill-current md:h-10 md:w-10" />
          </span>
        </button>
      )}
    </div>
  );
}
