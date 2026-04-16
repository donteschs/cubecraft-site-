"use client";

import { useRef } from "react";

interface MarqueeProps {
  items: React.ReactNode[];
  reverse?: boolean;
  speed?: number; /* seconds for one full cycle */
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}

/**
 * Infinite auto-scrolling marquee (21st.dev style).
 * Duplicates children so the loop is seamless.
 * Uses CSS animation — no JS scroll loop.
 */
export function Marquee({
  items,
  reverse = false,
  speed = 30,
  pauseOnHover = true,
  className = "",
  gap = "gap-4",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const animName = reverse ? "marquee-reverse" : "marquee";

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        ref={trackRef}
        className={`flex w-max ${gap}`}
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          ...(pauseOnHover ? {} : {}),
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover) (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {/* Original + duplicate for seamless loop */}
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`dup-${i}`} aria-hidden className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
