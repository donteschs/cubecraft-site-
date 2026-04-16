"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number; /* ms */
  threshold?: number;
  once?: boolean;
}

const INITIAL: Record<Direction, string> = {
  up:    "opacity-0 translate-y-8",
  left:  "opacity-0 -translate-x-8",
  right: "opacity-0 translate-x-8",
  scale: "opacity-0 scale-95",
};

/**
 * Wraps children and plays a CSS entrance animation when the element
 * enters the viewport. Zero JS animation — uses Tailwind transition classes.
 */
export function AnimateOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : INITIAL[direction]} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
