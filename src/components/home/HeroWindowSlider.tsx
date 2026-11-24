"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { SiteImages } from "@/lib/site-images";

export interface SlideItem {
  number: string;
  src: string;
  alt: string;
  category: string;
  title: string;
}

export default function HeroWindowSlider({
  siteImages,
}: {
  siteImages?: Partial<SiteImages>;
}) {
  const slides: SlideItem[] = [
    {
      number: "01",
      src:
        siteImages?.heroSlide1 ||
        siteImages?.heroImage ||
        "/review_image/01_mri_diagnostic_suite.webp",
      alt: "AusinX High-Field MRI Diagnostic Imaging Suite",
      category: "Diagnostic Imaging (MRI Suites)",
      title: "High-Field MRI Diagnostic Imaging Suite",
    },
    {
      number: "02",
      src:
        siteImages?.heroSlide2 ||
        "/review_image/02_oscilloscope_calibration_station_new.webp",
      alt: "Biomedical Calibration & Oscilloscope Testing",
      category: "AS/NZS 3551 Compliance & Safety",
      title: "Biomedical Calibration & Oscilloscope Testing",
    },
    {
      number: "03",
      src:
        siteImages?.heroSlide3 ||
        "/review_image/04_pcb_board_soldering_diagnostics.webp",
      alt: "Component-Level PCB Micro-Soldering & Diagnostics",
      category: "Industrial & Medical Electronics Repair",
      title: "Component-Level PCB Diagnostics & Micro-Soldering",
    },
    {
      number: "04",
      src:
        siteImages?.heroSlide4 ||
        "/review_image/06_cleanroom_precision_spares_new.webp",
      alt: "AusinX Medical Spares & Lifecycle Logistics",
      category: "OEM Parts Logistics & Storage",
      title: "AusinX Medical Spares & Lifecycle Logistics",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number>(slides.length - 1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Interval: Silky smooth progression every 1.9 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 1900);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, slides.length]);

  const activeSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-[2.5rem] border border-white/20 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.55)] group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Hover to pause slide animation"
    >
      {/* Persistently Mounted Slides: Continuous Hardware-Accelerated Smooth Glide */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        const isPrev = idx === prevIndex;

        // Smooth cinematic glide from left with soft opacity blend
        let transformStyle = "-translate-x-12 scale-[0.98] opacity-0 pointer-events-none z-0";
        if (isActive) {
          transformStyle = "translate-x-0 scale-100 opacity-100 z-20";
        } else if (isPrev) {
          transformStyle = "translate-x-10 scale-[1.02] opacity-0 z-10";
        }

        return (
          <div
            key={slide.number + slide.src}
            className={`absolute inset-0 w-full h-full will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${transformStyle}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              unoptimized
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover brightness-[0.93] contrast-[1.03]"
            />
          </div>
        );
      })}

      {/* Ambient Depth Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/25 to-black/20 z-20 pointer-events-none" />

      {/* Bottom Overlay Info Banner: Synced with Active Slide */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl glass-card-dark p-4 sm:p-5 shadow-2xl border border-white/15 z-30 pointer-events-none">
        <div key={activeSlide.number} className="animate-fade-in">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-brand-accent-on-dark block font-mono mb-1">
            {activeSlide.category}
          </span>
          <p className="text-sm sm:text-base font-semibold text-white leading-snug">
            {activeSlide.title}
          </p>
        </div>
      </div>
    </div>
  );
}
