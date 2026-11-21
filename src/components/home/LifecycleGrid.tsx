"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LifecycleGridProps {
  children: ReactNode;
}

export default function LifecycleGrid({ children }: LifecycleGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          // Highlight steps 0 through 4 in sequence with 220ms gap
          let current = 0;
          const interval = setInterval(() => {
            if (current < 5) {
              setHighlighted(current);
              current++;
            } else {
              clearInterval(interval);
              timer = setTimeout(() => setHighlighted(null), 400);
            }
          }, 260);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-highlighted-step={highlighted ?? -1}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      {children}
    </div>
  );
}
