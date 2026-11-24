"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";
import type { SiteImages } from "@/lib/site-images";

export interface WhyChooseSlideItem {
  id: string;
  src: string;
  alt: string;
  badge: string;
  title: string;
  desc: string;
}

export default function WhyChooseUsSlider({
  siteImages,
}: {
  siteImages?: Partial<SiteImages>;
}) {
  const slides: WhyChooseSlideItem[] = [
    {
      id: "01",
      src:
        siteImages?.whyChooseUsImage ||
        "/images/client/precision-calibration.jpeg",
      alt: "Senior AusinX biomedical service engineer conducting clinical equipment inspection",
      badge: "01 / Precision Calibration",
      title: "Direct Senior Engineer Accountability",
      desc: "No offshore call centres. Immediate direct access to specialist field engineers.",
    },
    {
      id: "02",
      src:
        siteImages?.whyChooseUsSlide2 ||
        "/images/client/why-choose-1.webp",
      alt: "Biomedical engineer calibrating clinical diagnostic equipment with precision oscilloscope",
      badge: "02 / Electrical Safety QA",
      title: "AS/NZS 3551 Compliance & Safety",
      desc: "NATA-traceable calibration and electrical safety verification for hospital compliance audits.",
    },
    {
      id: "03",
      src:
        siteImages?.whyChooseUsSlide3 ||
        "/images/client/why-choose-2.webp",
      alt: "Biomedical engineer inspecting medical electronic hardware and circuit assemblies",
      badge: "03 / Micro-Diagnostics",
      title: "Component-Level PCB Repair",
      desc: "Specialized electronic inspection and board-level repair to avoid costly module replacements.",
    },
    {
      id: "04",
      src:
        siteImages?.whyChooseUsSlide4 ||
        "/images/client/why-choose-3.webp",
      alt: "Specialist engineer testing medical telemetry sensors on calibration test bench",
      badge: "04 / Proactive Telemetry",
      title: "Zero Compromise Uptime",
      desc: "Real-time telemetry and waveform testing to eliminate clinical machinery failures.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(slides.length - 1);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Requirement: continuous slider that transitions one to another IF we hover on it; otherwise stays as it is
  useEffect(() => {
    if (!isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 1800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered, slides.length]);

  const activeSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className="relative h-72 sm:h-80 lg:h-[350px] w-full rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 shadow-xl group cursor-pointer select-none transition-all duration-500 hover:shadow-2xl hover:border-brand-accent/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Hover over this card to watch continuous slides"
    >
      {/* Sliding Images Stack */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        const isPrev = idx === prevIndex;

        let transformStyle = "-translate-x-10 scale-[0.98] opacity-0 pointer-events-none z-0";
        if (isActive) {
          transformStyle = "translate-x-0 scale-100 opacity-100 z-10";
        } else if (isPrev) {
          transformStyle = "translate-x-10 scale-[1.03] opacity-0 z-0";
        }

        return (
          <div
            key={slide.id + slide.src}
            className={`absolute inset-0 w-full h-full will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${transformStyle}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              unoptimized
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        );
      })}

      {/* Cinematic Depth Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/40 to-black/30 z-20 pointer-events-none" />

      {/* Top Floating Badge & Hover Indicator */}
      <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-30 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-brand-accent-on-dark text-[11px] font-mono font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent-on-dark animate-pulse" />
          <span>{activeSlide.badge}</span>
        </span>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-[11px] font-semibold transition-all duration-300 ${
            isHovered
              ? "bg-brand-accent text-white shadow-md"
              : "bg-black/50 text-slate-200 border border-white/10"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isHovered ? "bg-white animate-ping" : "bg-brand-accent"
            }`}
          />
          <span>{isHovered ? "Continuous Sliding" : "Hover to Slide"}</span>
        </span>
      </div>

      {/* Bottom Floating Info Banner */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 p-4 sm:p-5 shadow-2xl z-30 pointer-events-none">
        <div key={activeSlide.id} className="animate-fade-in space-y-1">
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
            <CheckCircle2 className="w-4 h-4 text-brand-accent-on-dark shrink-0" />
            <span>{activeSlide.title}</span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
            {activeSlide.desc}
          </p>
        </div>

        {/* Slide Progress Dots */}
        <div className="flex items-center gap-1.5 pt-3">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-8 bg-brand-accent"
                  : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
