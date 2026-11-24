"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  value,
  duration = 1000,
  className = "",
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Match leading non-digits, the number (with optional decimals), and trailing non-digits
    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const isDecimal = numStr.includes(".");
    const decimalPlaces = isDecimal ? numStr.split(".")[1].length : 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();
          const frame = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easedProgress;

            const formatted = isDecimal
              ? current.toFixed(decimalPlaces)
              : Math.floor(current).toString();

            setDisplayValue(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(frame);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
