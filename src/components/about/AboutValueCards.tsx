"use client";

import React, { useState } from "react";
import Image from "next/image";

interface IntroCardItem {
  step: string;
  title: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
}

export default function AboutValueCards({
  images,
}: {
  images?: {
    nationalCoverage?: string;
    equipmentLifecycle?: string;
    safetyCompliance?: string;
  };
}) {
  const cardsData: IntroCardItem[] = [
    {
      step: "01",
      title: "National coverage",
      text: "AusinX is a proudly Australian-owned and operated company providing a full range of services for medical equipment, healthcare products and industrial products. We support organisations across the entire equipment lifecycle, from the first planning conversation through to safe, compliant disposal.",
      imgSrc: images?.nationalCoverage || "/extra/1about_us.png",
      imgAlt: "National coverage - AusinX Biomedical & Industrial Engineering Solutions",
    },
    {
      step: "02",
      title: "Equipment lifecycle",
      text: "Our team delivers complete, end-to-end solutions: planning, decommissioning, disposal, installation and commissioning. Whether you are fitting out a new clinical space, upgrading ageing technology or retiring equipment at end of life, we manage the detail so your teams can stay focused on patient care.",
      imgSrc: images?.equipmentLifecycle || "/extra/2about_us.png",
      imgAlt: "Equipment lifecycle - AusinX Installation & Commissioning Expertise",
    },
    {
      step: "03",
      title: "Safety and compliance",
      text: "We are committed to reliable parts supply, dependable logistics and exceptional service for the healthcare sector. We understand that downtime in a clinical and industrial environment has real consequences, so we work to keep your equipment available, accurate and performing as it should.",
      imgSrc: images?.safetyCompliance || "/extra/3about_us.png",
      imgAlt: "Safety and compliance - AusinX Parts Supply & Engineering Support",
    },
  ];

  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {cardsData.map((card, index) => {
        const isFlipped = !!flippedCards[index];

        return (
          <div
            key={card.step}
            className="group relative h-[360px] sm:h-[340px] w-full [perspective:1400px] cursor-pointer select-none"
            onClick={() => toggleFlip(index)}
          >
            {/* 3D Flipping Card Container */}
            <div
              className={`relative h-full w-full rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] shadow-sm hover:shadow-2xl group-hover:[transform:rotateY(180deg)] ${isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
            >
              {/* FRONT FACE (DEFAULT): High-Resolution Image */}
              <div
                className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden] border border-slate-200/90 bg-slate-900 shadow-md flex flex-col justify-between"
              >
                {/* Background Image */}
                <Image
                  src={card.imgSrc}
                  alt={card.imgAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index === 0}
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Badge: Step Number & Pillar Name */}
                <div className="relative p-5 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 text-emerald-400 text-xs font-mono font-bold backdrop-blur-md border border-emerald-500/30 shadow-sm">
                    <span>{card.step}</span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    AusinX
                  </span>
                </div>

                {/* Bottom Overlay Title & Subtitle */}
                <div className="relative p-5 z-10 bg-gradient-to-t from-slate-950/95 to-transparent">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block font-mono mb-1">
                    About AusinX
                  </span>
                  <p className="text-base font-bold text-white leading-tight">
                    {card.title}
                  </p>
                </div>
              </div>

              {/* BACK FACE (ON HOVER): Text Box with Emerald Badge & Description */}
              <div
                className={`absolute inset-0 h-full w-full rounded-2xl border p-7 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl transition-colors duration-300 ${index === 0 || index === 2
                    ? "border-emerald-300/60 bg-[#edfbf4]"
                    : "border-slate-200 bg-white"
                  }`}
              >
                <div className="space-y-4 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {/* Badge & Title */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-mono font-bold tracking-tight transition-colors ${index === 0 || index === 2
                          ? "bg-emerald-600/15 text-emerald-800"
                          : "bg-emerald-500/15 text-emerald-700"
                        }`}
                    >
                      {card.step}
                    </span>
                    <span className="text-sm font-bold text-brand-primary">
                      {card.title}
                    </span>
                  </div>

                  {/* Body Paragraph */}
                  <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-slate-700 font-normal">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
